/**
 * Portfolio Admin API Server
 * Runs on http://localhost:3001
 * Handles all read/write operations for data/portfolio.json
 */

import express   from "express";
import cors      from "cors";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname }    from "path";
import { fileURLToPath }    from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "data", "portfolio.json");
const PORT      = 3001;

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json({ limit: "10mb" }));

// GET /api/portfolio — read the portfolio data
app.get("/api/portfolio", (_req, res) => {
  try {
    const raw  = readFileSync(DATA_PATH, "utf-8");
    res.json(JSON.parse(raw));
  } catch {
    res.status(404).json({ error: "portfolio.json not found" });
  }
});

// POST /api/portfolio — save the portfolio data
app.post("/api/portfolio", (req, res) => {
  try {
    const dir = dirname(DATA_PATH);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(DATA_PATH, JSON.stringify(req.body, null, 2), "utf-8");
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`\n  ✔ Admin API  →  http://localhost:${PORT}/api/portfolio\n`);
});
