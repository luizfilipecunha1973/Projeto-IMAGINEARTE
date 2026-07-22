const http = require('http');  
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = 3000;
const DB_PATH = path.join(__dirname, 'depoimentos.db');

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

const SIGLAS_VALIDAS = new Set(ESTADOS_BRASIL.map((e) => e.sigla));

const db = new DatabaseSync(DB_PATH);

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

const tableExists = (tableName) => {
    const row = db.prepare('SELECT name FROM sqlite_master WHERE type = ? AND name = ?').get('table', tableName);
    return Boolean(row);
};

const tableHasColumn = (tableName, columnName) => {
    const rows = db.prepare(`PRAGMA table_info(${tableName})`).all();
    return rows.some((row) => row.name === columnName);
};

const ensureSchema = () => {
    db.exec('PRAGMA foreign_keys = ON');

    db.exec(`
        CREATE TABLE IF NOT EXISTS estados (
            sigla TEXT PRIMARY KEY,
            nome TEXT NOT NULL UNIQUE
        )
    `);

    const insertEstado = db.prepare('INSERT OR IGNORE INTO estados (sigla, nome) VALUES (?, ?)');
    ESTADOS_BRASIL.forEach((estado) => {
        insertEstado.run(estado.sigla, estado.nome);
    });

    if (!tableExists('depoimentos')) {
        db.exec(`
            CREATE TABLE depoimentos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                estado_sigla TEXT NOT NULL,
                cidade TEXT NOT NULL,
                depoimento TEXT NOT NULL,
                data DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (estado_sigla) REFERENCES estados(sigla)
            )
        `);
        return;
    }

    if (tableHasColumn('depoimentos', 'estado_sigla')) {
        return;
    }

    db.exec('BEGIN TRANSACTION');
    try {
        db.exec('ALTER TABLE depoimentos RENAME TO depoimentos_legacy');
        db.exec(`
            CREATE TABLE depoimentos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                estado_sigla TEXT NOT NULL,
                cidade TEXT NOT NULL,
                depoimento TEXT NOT NULL,
                data DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (estado_sigla) REFERENCES estados(sigla)
            )
        `);

        const legacyRows = db.prepare('SELECT id, nome, email, estado, cidade, depoimento, data FROM depoimentos_legacy').all();
        const insertDepoimento = db.prepare(`
            INSERT INTO depoimentos (id, nome, email, estado_sigla, cidade, depoimento, data)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        let migratedCount = 0;
        legacyRows.forEach((row) => {
            const sigla = findEstadoSigla(row.estado);
            if (!sigla) {
                return;
            }

            insertDepoimento.run(row.id, row.nome, row.email, sigla, row.cidade, row.depoimento, row.data);
            migratedCount += 1;
        });

        db.exec('COMMIT');
        console.log(`Migracao concluida: ${migratedCount} depoimento(s) copiado(s) para o novo schema.`);
    } catch (error) {
        db.exec('ROLLBACK');
        throw error;
    }
};

ensureSchema();

const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', (error) => reject(error));
    });
};

const jsonResponse = (res, status, payload) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
};

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    try {
        if (pathname === '/api/estados' && req.method === 'GET') {
            const estados = db.prepare('SELECT sigla, nome FROM estados ORDER BY sigla ASC').all();
            jsonResponse(res, 200, estados);
            return;
        }

        if (pathname === '/api/depoimentos' && req.method === 'GET') {
            const rows = db.prepare(`
                SELECT d.id, d.nome, d.email, e.nome AS estado, d.cidade, d.depoimento, d.data
                FROM depoimentos d
                INNER JOIN estados e ON e.sigla = d.estado_sigla
                ORDER BY d.data DESC
            `).all();
            jsonResponse(res, 200, rows);
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

            const result = db.prepare(`
                INSERT INTO depoimentos (nome, email, estado_sigla, cidade, depoimento)
                VALUES (?, ?, ?, ?, ?)
            `).run(nome, email, estadoSigla, cidade, depoimento);

            const inserted = db.prepare(`
                SELECT d.id, d.nome, d.email, e.nome AS estado, d.cidade, d.depoimento, d.data
                FROM depoimentos d
                INNER JOIN estados e ON e.sigla = d.estado_sigla
                WHERE d.id = ?
            `).get(result.lastInsertRowid);

            jsonResponse(res, 201, inserted);
            return;
        }

        if (/^\/api\/depoimentos\/\d+$/.test(pathname) && req.method === 'DELETE') {
            const id = Number.parseInt(pathname.split('/').pop(), 10);
            const result = db.prepare('DELETE FROM depoimentos WHERE id = ?').run(id);
            jsonResponse(res, 200, { success: true, removidos: result.changes });
            return;
        }

        let filePath = pathname === '/' ? 'index.html' : pathname;
        filePath = path.join(__dirname, filePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Arquivo nao encontrado</h1>');
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'text/html; charset=utf-8';
            if (ext === '.js') contentType = 'text/javascript; charset=utf-8';
            else if (ext === '.css') contentType = 'text/css; charset=utf-8';
            else if (ext === '.json') contentType = 'application/json; charset=utf-8';
            else if (ext === '.mp4') contentType = 'video/mp4';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } catch (error) {
        console.error('Erro interno:', error);
        jsonResponse(res, 500, { error: 'Erro interno do servidor.' });
    }
});

server.listen(PORT, () => {
    const totalDepoimentos = db.prepare('SELECT COUNT(*) AS total FROM depoimentos').get().total;
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Banco em uso: ${DB_PATH}`);
    console.log(`Estados carregados: ${ESTADOS_BRASIL.length}`);
    console.log(`Depoimentos existentes: ${totalDepoimentos}`);
});

process.on('SIGINT', () => {
    console.log('\nEncerrando servidor...');
    db.close();
    process.exit(0);
});
