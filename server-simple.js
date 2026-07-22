const http = require('http'); 
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const PORT = 3000;
const DB_PATH = './depoimentos.db';

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

const normalizarSiglaEstado = (estado) => {
    return (estado || '').toString().trim().toUpperCase();
};

// Inicializar banco de dados
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }
    console.log('Conectado ao banco de dados: ' + DB_PATH);
});

// Criar tabela se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS depoimentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        estado TEXT NOT NULL,
        cidade TEXT NOT NULL,
        depoimento TEXT NOT NULL,
        data DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Rotas da API
    if (req.url === '/api/estados' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(ESTADOS_BRASIL));
    }
    else if (req.url === '/api/depoimentos' && req.method === 'GET') {
        db.all('SELECT * FROM depoimentos ORDER BY data DESC', (err, rows) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: err.message}));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(rows));
        });
    } 
    else if (req.url === '/api/depoimentos' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const {nome, email, estado, cidade, depoimento} = JSON.parse(body);
                const estadoSigla = normalizarSiglaEstado(estado);
                
                if (!nome || !email || !estadoSigla || !cidade || !depoimento) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: 'Campos obrigatórios faltando'}));
                    return;
                }

                if (!SIGLAS_VALIDAS.has(estadoSigla)) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: 'Estado inválido'}));
                    return;
                }

                db.run('INSERT INTO depoimentos (nome, email, estado, cidade, depoimento) VALUES (?, ?, ?, ?, ?)',
                    [nome, email, estadoSigla, cidade, depoimento],
                    function(err) {
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({error: err.message}));
                            return;
                        }
                        res.writeHead(201, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({id: this.lastID, nome, email, estado: estadoSigla, cidade, depoimento}));
                    }
                );
            } catch (e) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'JSON inválido'}));
            }
        });
    }
    else if (req.url.match(/^\/api\/depoimentos\/\d+$/) && req.method === 'DELETE') {
        const id = req.url.split('/').pop();
        db.run('DELETE FROM depoimentos WHERE id = ?', [id], function(err) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: err.message}));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({success: true}));
        });
    }
    else {
        // Servir arquivos estáticos
        let filePath = req.url === '/' ? 'index.html' : req.url;
        filePath = path.join(__dirname, filePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 - Arquivo não encontrado</h1>');
                return;
            }

            const ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.js') contentType = 'text/javascript';
            else if (ext === '.css') contentType = 'text/css';
            else if (ext === '.mp4') contentType = 'video/mp4';
            else if (ext === '.png') contentType = 'image/png';

            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        });
    }
});

server.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Banco de dados: ${DB_PATH}`);
});

process.on('SIGINT', () => {
    console.log('\n📛 Encerrando servidor...');
    db.close((err) => {
        if (err) console.error(err);
        process.exit(0);
    });
});
