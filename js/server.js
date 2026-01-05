require("dotenv").config();
const axios = require("axios");

// ==============================
// PROTEGER TODOS AS PÁGINAS
// ==============================
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = "./db.json";
const SECRET = "hairhub_segredo";

// ==============================
// UTIL
// ==============================
function lerDB() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DB_PATH));
}

function salvarDB(dados) {
    fs.writeFileSync(DB_PATH, JSON.stringify(dados, null, 2));
}

// ==============================
// LOGIN (SIMULADO)
// ==============================
app.post("/login", (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Telefone obrigatório" });

    const token = jwt.sign({ phone }, SECRET, { expiresIn: "7d" });
    res.json({ token });
});

// ==============================
// AGENDAMENTOS (PROTEGIDO)
// ==============================
app.get("/agendamentos", auth, (req, res) => {
    const dados = lerDB().filter(a => a.user === req.user);
    res.json(dados);
});

app.post("/agendamentos", auth, (req, res) => {
    const { servico, valor, data, hora } = req.body;
    const dados = lerDB();

    const conflito = dados.find(
        a => a.user === req.user && a.data === data && a.hora === hora
    );
    if (conflito) return res.status(409).json({ error: "Horário ocupado" });

    dados.push({ user: req.user, servico, valor, data, hora });
    salvarDB(dados);
    res.status(201).json({ message: "Agendado" });
});

app.delete("/agendamentos", auth, (req, res) => {
    const { data, hora } = req.body;
    let dados = lerDB();

    dados = dados.filter(
        a => !(a.user === req.user && a.data === data && a.hora === hora)
    );

    salvarDB(dados);
    res.json({ message: "Cancelado" });
});

// ==============================
app.listen(3000, () => {
    console.log("✅ Backend com login rodando");
});