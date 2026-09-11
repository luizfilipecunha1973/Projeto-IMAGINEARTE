
const homeCrafts = [
    { name: 'Barbearia Rexexo', src: './img/comercial/001-Barbearia Rexexo.mp4' }   
]

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
const VIDEO_DIRECTORIES = new Set(['artesanato', 'comercial', 'residencial', 'institucionais']);
const MAX_VIDEO_UPLOAD_BYTES = 500 * 1024 * 1024;
const ADMIN_TOKEN = (process.env.ADMIN_TOKEN || '').trim();
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || '').trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || '').trim();

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

const isAdminLoginConfigured = () => {
    return Boolean(ADMIN_TOKEN && ADMIN_USERNAME && ADMIN_PASSWORD);
};

const contentTypeByExtension = (ext) => {
    if (ext === '.js') return 'text/javascript; charset=utf-8';
    if (ext === '.css') return 'text/css; charset=utf-8';
    if (ext === '.json') return 'application/json; charset=utf-8';
    if (ext === '.mp4') return 'video/mp4';
    if (ext === '.mp3' || ext === '.mpeg') return 'audio/mpeg';
    if (ext === '.wav') return 'audio/wav';
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

    const relativeResolvedPath = path.relative(__dirname, resolvedPath);
    if (relativeResolvedPath.startsWith('..') || path.isAbsolute(relativeResolvedPath)) {
        return null;
    }

    return resolvedPath;
};

const sanitizeVideoName = (rawName) => {
    const decodedName = decodeURIComponent((rawName || '').toString()).trim();
    const baseName = path.basename(decodedName);
    const extension = path.extname(baseName).toLowerCase();
    const stem = path.basename(baseName, path.extname(baseName))
        .replace(/^\d{3}-/, '')
        .replace(/[^\p{L}\p{N}._ -]/gu, '')
        .trim();

    if (!stem || extension !== '.mp4') {
        return null;
    }

    return `${stem}${extension}`;
};

const getNextVideoName = (directoryPath, fileName) => {
    const entries = fs.existsSync(directoryPath) ? fs.readdirSync(directoryPath) : [];
    const nextIndex = entries.reduce((max, entry) => {
        const match = entry.match(/^(\d{3})-/);
        return match ? Math.max(max, Number.parseInt(match[1], 10)) : max;
    }, 0) + 1;

    return `${String(nextIndex).padStart(3, '0')}-${fileName}`;
};

const listVideoCatalog = () => {                                                  // (VIDEO.)Lê os vídeos disponíveis no servidor
    return Array.from(VIDEO_DIRECTORIES).reduce((catalog, category) => {           // (VIDEO.)Monta catálogo separado por categoria
        const directoryPath = path.join(__dirname, 'videos', category);             // (VIDEO.)Calcula pasta da categoria
        const entries = fs.existsSync(directoryPath) ? fs.readdirSync(directoryPath) : []; // (VIDEO.)Lê arquivos existentes
        catalog[category] = entries
            .filter((entry) => path.extname(entry).toLowerCase() === '.mp4')       // (VIDEO.)Ignora arquivos que não são MP4
            .sort((first, second) => first.localeCompare(second, 'pt-BR', { numeric: true })) // (VIDEO.)Mantém ordem numérica
            .map((entry) => ({                                                     // (VIDEO.)Converte arquivo para item do frontend
                name: entry.replace(/^\d{3}-/, '').replace(/\.mp4$/i, ''),         // (VIDEO.)Remove prefixo técnico e extensão
                src: `./videos/${category}/${encodeURIComponent(entry)}`            // (VIDEO.)Codifica nome para URL segura
            }));
        return catalog;                                                            // (VIDEO.)Retorna catálogo acumulado
    }, {});
};

const streamVideoUpload = (req, destinationPath) => {
    return new Promise((resolve, reject) => {
        let totalBytes = 0;
        const tempPath = `${destinationPath}.tmp-${process.pid}-${Date.now()}`;
        const output = fs.createWriteStream(tempPath, { flags: 'wx' });
        let settled = false;

        const fail = (error) => {
            if (settled) return;
            settled = true;
            output.destroy();
            fs.rm(tempPath, { force: true }, () => reject(error));
        };

        req.on('data', (chunk) => {
            totalBytes += chunk.length;
            if (totalBytes > MAX_VIDEO_UPLOAD_BYTES) {
                fail(new Error('Video muito grande. O limite e 500 MB.'));
                req.destroy();
                return;
            }
            output.write(chunk);
        });

        req.on('end', () => {
            if (settled) return;
            output.end(() => {
                settled = true;
                fs.rename(tempPath, destinationPath, (error) => {
                    if (error) {
                        fs.rm(tempPath, { force: true }, () => reject(error));
                        return;
                    }
                    resolve(totalBytes);
                });
            });
        });

        req.on('error', fail);
        output.on('error', fail);
    });
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
                protectedDelete: Boolean(ADMIN_TOKEN),
                adminLoginEnabled: isAdminLoginConfigured()
            });
            return;
        }

        if (pathname === '/api/admin/login' && req.method === 'POST') {
            if (!isAdminLoginConfigured()) {
                jsonResponse(res, 503, { error: 'Login admin nao configurado no servidor.' });
                return;
            }

            const payload = await parseRequestBody(req);
            const username = (payload.username || '').toString().trim();
            const password = (payload.password || '').toString();

            if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
                jsonResponse(res, 401, { error: 'Credenciais invalidas.' });
                return;
            }

            jsonResponse(res, 200, { token: ADMIN_TOKEN });
            return;
        }

        if (pathname === '/api/admin/videos' && req.method === 'POST') {
            if (!ADMIN_TOKEN) {
                jsonResponse(res, 503, { error: 'Upload admin nao configurado no servidor.' });
                return;
            }

            if (!isDeleteAuthorized(req)) {
                jsonResponse(res, 401, { error: 'Nao autorizado para enviar videos.' });
                return;
            }

            const category = (req.headers['x-video-category'] || '').toString().trim().toLowerCase();
            const cleanName = sanitizeVideoName(req.headers['x-video-name']);
            const contentLength = Number.parseInt(req.headers['content-length'] || '0', 10);

            if (!VIDEO_DIRECTORIES.has(category) || !cleanName || contentLength <= 0 || contentLength > MAX_VIDEO_UPLOAD_BYTES) {
                jsonResponse(res, 400, { error: 'Categoria, nome ou tamanho do video invalido.' });
                return;
            }

            const directoryPath = path.join(__dirname, 'videos', category);
            fs.mkdirSync(directoryPath, { recursive: true });
            const storedName = getNextVideoName(directoryPath, cleanName);
            const destinationPath = path.join(directoryPath, storedName);
            const bytes = await streamVideoUpload(req, destinationPath);

            jsonResponse(res, 201, {
                category,
                name: storedName,
                path: `./videos/${category}/${storedName}`,
                bytes
            });
            return;
        }

        if (pathname === '/api/estados' && req.method === 'GET') {
            jsonResponse(res, 200, ESTADOS_BRASIL);
            return;
        }

        if (pathname === '/api/videos' && req.method === 'GET') {
            jsonResponse(res, 200, listVideoCatalog());                            // (VIDEO.)Entrega catálogo atualizado ao frontend
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
    console.log(`Login admin habilitado: ${isAdminLoginConfigured() ? 'sim' : 'nao'}`);
});
