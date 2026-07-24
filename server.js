const http = require('http');
const fs = require('fs');
const path = require('path');

const loadEnvFile = () => {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
        return;
    }

    const content = fs.readFileSync(envPath, 'utf-8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            return;
        }

        const equalIndex = trimmed.indexOf('=');
        if (equalIndex <= 0) {
            return;
        }

        const key = trimmed.slice(0, equalIndex).trim();
        const rawValue = trimmed.slice(equalIndex + 1).trim();

        if (!key || process.env[key] !== undefined) {
            return;
        }

        const unquotedValue = rawValue.replace(/^['\"]|['\"]$/g, '');
        process.env[key] = unquotedValue;
    });
};

loadEnvFile();

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const DATA_PATH = path.resolve(__dirname, process.env.DATA_PATH || 'depoimentos.json');
const ADMIN_TOKEN = (process.env.ADMIN_TOKEN || '').trim();

const rawAllowedOrigins = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || '').trim();
const ALLOWED_ORIGINS = new Set(
    rawAllowedOrigins
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
);

const ESTADOS_BRASIL = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapa' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceara' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espirito Santo' },
    { sigla: 'GO', nome: 'Goias' },
    { sigla: 'MA', nome: 'Maranhao' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Para' },
    { sigla: 'PB', nome: 'Paraiba' },
    { sigla: 'PR', nome: 'Parana' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piaui' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondonia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'Sao Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
];

const SIGLAS_VALIDAS = new Set(ESTADOS_BRASIL.map((estado) => estado.sigla));
const ESTADO_POR_SIGLA = new Map(ESTADOS_BRASIL.map((estado) => [estado.sigla, estado.nome]));

const normalizeText = (value) => {
    return (value || '')
        .toString()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
};

const findEstadoSigla = (rawEstado) => {
    const normalized = normalizeText(rawEstado);
    if (!normalized) {
        return null;
    }

    if (SIGLAS_VALIDAS.has(normalized)) {
        return normalized;
    }

    const maybeSigla = normalized.split('-')[0].trim();
    if (SIGLAS_VALIDAS.has(maybeSigla)) {
        return maybeSigla;
    }

    const byName = ESTADOS_BRASIL.find((estado) => normalizeText(estado.nome) === normalized);
    return byName ? byName.sigla : null;
};

const isOriginAllowed = (origin) => {
    if (ALLOWED_ORIGINS.size === 0) {
        return true;
    }
    return ALLOWED_ORIGINS.has(origin);
};

const applyCors = (req, res) => {
    const origin = req.headers.origin;

    if (!origin) {
        if (ALLOWED_ORIGINS.size === 0) {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
        return true;
    }

    if (!isOriginAllowed(origin)) {
        return false;
    }

    if (ALLOWED_ORIGINS.size === 0) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    } else {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }

    return true;
};

const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        const maxBytes = 1024 * 1024;

        req.on('data', (chunk) => {
            body += chunk;
            if (body.length > maxBytes) {
                reject(new Error('Payload muito grande.'));
                req.destroy();
            }
        });

        req.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('JSON invalido.'));
            }
        });

        req.on('error', (error) => reject(error));
    });
};

const jsonResponse = (res, status, payload) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
};

const ensureDataFile = () => {
    if (!fs.existsSync(DATA_PATH)) {
        fs.writeFileSync(DATA_PATH, '[]\n', 'utf-8');
    }
};

const readDepoimentos = () => {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        throw new Error('Arquivo de dados invalido.');
    }
};

const writeDepoimentos = (depoimentos) => {
    const tempPath = `${DATA_PATH}.tmp`;
    fs.writeFileSync(tempPath, `${JSON.stringify(depoimentos, null, 2)}\n`, 'utf-8');
    fs.renameSync(tempPath, DATA_PATH);
};

const normalizeDepoimentoForOutput = (item) => {
    const estadoSigla = findEstadoSigla(item.estado);
    const estadoNome = estadoSigla ? ESTADO_POR_SIGLA.get(estadoSigla) : (item.estado || '');

    return {
        id: item.id,
        nome: item.nome,
        email: item.email,
        estado: estadoNome,
        cidade: item.cidade,
        depoimento: item.depoimento,
        data: item.data
    };
};

let writeQueue = Promise.resolve();

const mutateDepoimentos = async (mutator) => {
    const pending = writeQueue.then(async () => {
        const depoimentos = readDepoimentos();
        const result = await mutator(depoimentos);
        writeDepoimentos(depoimentos);
        return result;
    });

    writeQueue = pending.catch(() => undefined);
    return pending;
};

const extractBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) {
        return '';
    }

    const [scheme, token] = authorizationHeader.split(' ');
    if (!scheme || !token || scheme.toLowerCase() !== 'bearer') {
        return '';
    }

    return token.trim();
};

const isDeleteAuthorized = (req) => {
    if (!ADMIN_TOKEN) {
        return true;
    }

    const fromHeader = (req.headers['x-admin-token'] || '').toString().trim();
    const fromBearer = extractBearerToken((req.headers.authorization || '').toString());

    return fromHeader === ADMIN_TOKEN || fromBearer === ADMIN_TOKEN;
};

const contentTypeByExtension = (ext) => {
    if (ext === '.js') return 'text/javascript; charset=utf-8';
    if (ext === '.css') return 'text/css; charset=utf-8';
    if (ext === '.json') return 'application/json; charset=utf-8';
    if (ext === '.mp4') return 'video/mp4';
    if (ext === '.png') return 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
    if (ext === '.svg') return 'image/svg+xml';
    if (ext === '.ico') return 'image/x-icon';
    if (ext === '.webp') return 'image/webp';
    return 'text/html; charset=utf-8';
};

const resolveStaticPath = (pathname) => {
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const decodedPath = decodeURIComponent(relativePath);
    const resolvedPath = path.resolve(__dirname, decodedPath);

    if (!resolvedPath.startsWith(__dirname)) {
        return null;
    }

    return resolvedPath;
};

const server = http.createServer(async (req, res) => {
    const corsAllowed = applyCors(req, res);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token, Authorization');

    if (!corsAllowed) {
        jsonResponse(res, 403, { error: 'Origem nao permitida por CORS.' });
        return;
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    try {
        if (pathname === '/api/health' && req.method === 'GET') {
            jsonResponse(res, 200, {
                ok: true,
                service: 'imaginearte-api',
                timestamp: new Date().toISOString(),
                storage: DATA_PATH,
                protectedDelete: Boolean(ADMIN_TOKEN)
            });
            return;
        }

        if (pathname === '/api/estados' && req.method === 'GET') {
            jsonResponse(res, 200, ESTADOS_BRASIL);
            return;
        }

        if (pathname === '/api/depoimentos' && req.method === 'GET') {
            const depoimentos = readDepoimentos()
                .slice()
                .sort((a, b) => new Date(b.data || 0).getTime() - new Date(a.data || 0).getTime())
                .map(normalizeDepoimentoForOutput);

            jsonResponse(res, 200, depoimentos);
            return;
        }

        if (pathname === '/api/depoimentos' && req.method === 'POST') {
            const payload = await parseRequestBody(req);
            const nome = (payload.nome || '').toString().trim();
            const email = (payload.email || '').toString().trim();
            const cidade = (payload.cidade || '').toString().trim();
            const depoimento = (payload.depoimento || '').toString().trim();
            const estadoSigla = findEstadoSigla(payload.estado);

            if (!nome || !email || !cidade || !depoimento || !estadoSigla) {
                jsonResponse(res, 400, { error: 'Campos obrigatorios faltando ou estado invalido.' });
                return;
            }

            const inserted = await mutateDepoimentos((depoimentos) => {
                const maxId = depoimentos.reduce((max, item) => {
                    const currentId = Number.isFinite(Number(item.id)) ? Number(item.id) : 0;
                    return Math.max(max, currentId);
                }, 0);

                const novoDepoimento = {
                    id: maxId + 1,
                    nome,
                    email,
                    estado: ESTADO_POR_SIGLA.get(estadoSigla) || estadoSigla,
                    cidade,
                    depoimento,
                    data: new Date().toISOString()
                };

                depoimentos.push(novoDepoimento);
                return novoDepoimento;
            });

            jsonResponse(res, 201, normalizeDepoimentoForOutput(inserted));
            return;
        }

        if (/^\/api\/depoimentos\/\d+$/.test(pathname) && req.method === 'DELETE') {
            if (!isDeleteAuthorized(req)) {
                jsonResponse(res, 401, { error: 'Nao autorizado para excluir depoimento.' });
                return;
            }

            const id = Number.parseInt(pathname.split('/').pop(), 10);
            const removidos = await mutateDepoimentos((depoimentos) => {
                const before = depoimentos.length;
                const filtrados = depoimentos.filter((item) => Number(item.id) !== id);
                depoimentos.length = 0;
                depoimentos.push(...filtrados);
                return before - filtrados.length;
            });

            jsonResponse(res, 200, { success: true, removidos });
            return;
        }

        const filePath = resolveStaticPath(pathname);
        if (!filePath) {
            res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>403 - Acesso negado</h1>');
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Arquivo nao encontrado</h1>');
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, { 'Content-Type': contentTypeByExtension(ext) });
            res.end(data);
        });
    } catch (error) {
        console.error('Erro interno:', error);

        if (error.message === 'JSON invalido.' || error.message === 'Payload muito grande.') {
            jsonResponse(res, 400, { error: error.message });
            return;
        }

        jsonResponse(res, 500, { error: 'Erro interno do servidor.' });
    }
});

server.listen(PORT, HOST, () => {
    const totalDepoimentos = readDepoimentos().length;
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
    console.log(`Arquivo de dados: ${DATA_PATH}`);
    console.log(`Estados carregados: ${ESTADOS_BRASIL.length}`);
    console.log(`Depoimentos existentes: ${totalDepoimentos}`);
    if (ALLOWED_ORIGINS.size > 0) {
        console.log(`CORS restrito para: ${Array.from(ALLOWED_ORIGINS).join(', ')}`);
    } else {
        console.log('CORS aberto para qualquer origem.');
    }
    console.log(`Delete protegido por token: ${ADMIN_TOKEN ? 'sim' : 'nao'}`);
});
