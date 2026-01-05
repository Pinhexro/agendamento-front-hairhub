// ==============================
// PROTEGER TODOS AS PÁGINAS
// ==============================
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const API_URL = "http://localhost:3000/agendamentos";

async function listarAgendamentos() {
    const res = await fetch(API_URL);
    return res.json();
}

async function criarAgendamento(dados) {
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

async function cancelarAgendamento(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}