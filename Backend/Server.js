const http = require('http');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const hostname = '127.0.0.1';
const port = 3000;
const dbFilePath = 'Trainingstagebuch.db';

async function getDb() {
  const db = await sqlite.open({ filename: dbFilePath, driver: sqlite3.Database });
  await db.run(`CREATE TABLE IF NOT EXISTS trainings (
    date TEXT PRIMARY KEY,
    sport TEXT,
    duration INTEGER,
    feeling TEXT
  )`);
  return db;
}

const server = http.createServer(async (req, res) => {
  // CORS-Header
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // POST /activity
  if (req.method === 'POST' && req.url === '/activity') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { date, sport, duration, feeling } = JSON.parse(body);
        const db = await getDb();
        await db.run(
          `INSERT OR REPLACE INTO trainings (date, sport, duration, feeling) VALUES (?, ?, ?, ?)`,
          date, sport, duration, feeling
        );
        await db.close();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: err.message }));
      }
    });
    return;
  }

  // GET /activities
  if (req.method === 'GET' && req.url === '/activities') {
    try {
      const db = await getDb();
      const rows = await db.all('SELECT * FROM trainings ORDER BY date DESC');
      await db.close();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(rows));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'error', message: err.message }));
    }
    return;
  }

// DELETE /activity/:date
if (req.method === 'DELETE' && req.url.startsWith('/activity/')) {
  const date = decodeURIComponent(req.url.split('/').pop());
  try {
    const db = await getDb();
    await db.run('DELETE FROM trainings WHERE date = ?', date);
    await db.close();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: err.message }));
  }
  return;
}

  // Fallback
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(port, hostname, () => {
  console.log(`Server läuft unter http://${hostname}:${port}/`);
});

