const lista = document.getElementById("lista-agendamentos");
const horaSelect = document.getElementById("hora");

function gerarHorarios() {
    horaSelect.innerHTML = "<option value=''>Horário</option>";
    for (let h = 9; h <= 18; h++) {
        ["00", "30"].forEach(min => {
            const hora = `${String(h).padStart(2, "0")}:${min}`;
            const opt = document.createElement("option");
            opt.value = hora;
            opt.textContent = hora;
            horaSelect.appendChild(opt);
        });
    }
}

function carregarAgendamentos(agendamentos = getAgendamentos()) {
    lista.innerHTML = "";

    if (agendamentos.length === 0) {
        lista.innerHTML = "<li>Nenhum agendamento</li>";
        return;
    }

    agendamentos.forEach((a, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
           <div class="agendamento-info">
                <strong>${a.servico}</strong><br>
                Cliente: ${a.nome} (${a.telefone})<br>
                ${a.data} - ${a.hora}
                </div>
            <button class="cancelar" onclick="cancelar(${index})">Cancelar</button>
        `;

        lista.appendChild(li);
    });
}

function agendarManual() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    if (!nome || !telefone || !servico || !data || !hora) {
        alert("Preencha todos os campos");
        return;
    }

    const agendamentos = getAgendamentos();

    const conflito = agendamentos.some(
        a => a.data === data && a.hora === hora
    );

    if (conflito) {
        alert("Horário já ocupado");
        return;
    }

    agendamentos.push({ nome, telefone, servico, data, hora });
    salvarAgendamentos(agendamentos);

    alert("Agendamento realizado");
    carregarAgendamentos();
    atualizarDashboard();
}

function cancelar(index) {
    if (confirm("Cancelar este agendamento?")) {
        removerAgendamento(index);
        carregarAgendamentos();
    }
}

function filtrar() {
    const data = document.getElementById("filtroData").value;
    const periodo = document.getElementById("filtroPeriodo").value;

    let agendamentos = getAgendamentos();

    if (!data) {
        carregarAgendamentos(agendamentos);
        return;
    }

    const base = new Date(data);

    agendamentos = agendamentos.filter(a => {
        const d = new Date(a.data);

        if (periodo === "dia") {
            return d.toDateString() === base.toDateString();
        }

        if (periodo === "semana") {
            const diff = (d - base) / (1000 * 60 * 60 * 24);
            return diff >= 0 && diff < 7;
        }

        if (periodo === "mes") {
            return d.getMonth() === base.getMonth() &&
                d.getFullYear() === base.getFullYear();
        }
    });

    carregarAgendamentos(agendamentos);
}

function atualizarDashboard() {
    const agendamentos = getAgendamentos();
    const hoje = new Date();

    let totalHoje = 0;
    let totalSemana = 0;
    let totalMes = 0;

    agendamentos.forEach(a => {
        const dataAg = new Date(a.data);

        // Hoje
        if (dataAg.toDateString() === hoje.toDateString()) {
            totalHoje++;
        }

        // Semana
        const diffDias = (dataAg - hoje) / (1000 * 60 * 60 * 24);
        if (diffDias >= 0 && diffDias < 7) {
            totalSemana++;
        }

        // Mês
        if (
            dataAg.getMonth() === hoje.getMonth() &&
            dataAg.getFullYear() === hoje.getFullYear()
        ) {
            totalMes++;
        }
    });

    document.getElementById("total-hoje").textContent = totalHoje;
    document.getElementById("total-semana").textContent = totalSemana;
    document.getElementById("total-mes").textContent = totalMes;
}

gerarHorarios();
carregarAgendamentos();
atualizarDashboard();


