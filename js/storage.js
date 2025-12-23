const API = "http://localhost:3000";

// Pega o token salvo no login
function getToken() {
    return localStorage.getItem("token");
}

// ==============================
// LISTAR AGENDAMENTOS
// ==============================
async function listarAgendamentos() {
    const res = await fetch(`${API}/agendamentos`, {
        headers: {
            "Authorization": getToken()
        }
    });

    return await res.json();
}

// ==============================
// CRIAR AGENDAMENTO
// ==============================
async function salvarAgendamento(agendamento) {
    const res = await fetch(`${API}/agendamentos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(agendamento)
    });

    if (!res.ok) {
        const erro = await res.json();
        alert(erro.error);
        throw new Error(erro.error);
    }
}

// ==============================
// CANCELAR AGENDAMENTO
// ==============================
async function cancelarAgendamento(data, hora) {
    await fetch(`${API}/agendamentos`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify({ data, hora })
    });
}

// ==============================
// HORÁRIOS OCUPADOS
// ==============================
async function horariosOcupadosPorData(data) {
    const agendamentos = await listarAgendamentos();
    return agendamentos
        .filter(a => a.data === data)
        .map(a => a.hora);
}
