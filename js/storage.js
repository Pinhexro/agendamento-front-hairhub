const STORAGE_KEY = "agendamentos";

function getAgendamentos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function salvarAgendamento(agendamento) {
    const agendamentos = getAgendamentos();
    agendamentos.push(agendamento);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));
}

function removerAgendamento(index) {
    const agendamentos = getAgendamentos();
    agendamentos.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));
}
