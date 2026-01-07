// ==============================
// PROTEGER TODOS AS PÁGINAS
// ==============================
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const API_URL = "https://agendamento-hairhub-urkz.onrender.com/agendamentos";

async function listarAgendamentos() {
    const res = await fetch("https://agendamento-hairhub-urkz.onrender.com/agendamentos");
    return res.json();
}

async function criarAgendamento(dados) {
    await fetch("https://agendamento-hairhub-urkz.onrender.com/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

async function cancelarAgendamento(id) {
    await fetch(`${"https://agendamento-hairhub-urkz.onrender.com/agendamentos"}/${id}`, {
        method: "DELETE"
    });
}