const horaSelect = document.getElementById("hora");
const dataInput = document.getElementById("data");

function gerarHorarios() {
    horaSelect.innerHTML = "<option value=''>Selecione o horário</option>";

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

function bloquearHorarios() {
    gerarHorarios();

    if (!dataInput.value) return;

    const agendamentos = getAgendamentos();

    agendamentos
        .filter(a => a.data === dataInput.value)
        .forEach(a => {
            const opt = [...horaSelect.options].find(o => o.value === a.hora);
            if (opt) opt.disabled = true;
        });
}  

dataInput.addEventListener("change", bloquearHorarios);

function confirmar() {
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    if (!nome || !telefone || !servico || !data || !hora) {
        alert("Preencha todos os campos");
        return;
    }

    // ✅ SALVA O TELEFONE PARA "MEUS AGENDAMENTOS"
    localStorage.setItem("telefone", telefone);

    fetch("https://agendamento-hairhub-urkz.onrender.com/agendamentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            telefone,
            servico,
            data,
            hora
        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao agendar");
            return res.json();
        })
        .then(() => {
            alert("Agendamento confirmado!");
            window.location.href = "agendamentos.html";
        })
        .catch(() => {
            alert("Horário indisponível ou erro no servidor");
        });
}

gerarHorarios();
