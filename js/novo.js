// ==============================
// PROTEGER TODOS AS PÁGINAS
// ==============================
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const horaSelect = document.getElementById("hora");
const dataInput = document.getElementById("data");
const servicoSelect = document.getElementById("servico");

// Configuração
const HORA_INICIO = 9;
const HORA_FIM = 18;
const INTERVALO = 30;

// ==============================
// GERAR HORÁRIOS DISPONÍVEIS
// ==============================
async function gerarHorariosDisponiveis() {
    horaSelect.innerHTML = '<option value="">Carregando...</option>';

    const dataSelecionada = dataInput.value;
    if (!dataSelecionada) {
        horaSelect.innerHTML = '<option value="">Selecione a data</option>';
        return;
    }

    const ocupados = await horariosOcupadosPorData(dataSelecionada);

    horaSelect.innerHTML = '<option value="">Selecione o horário</option>';

    for (let hora = HORA_INICIO; hora < HORA_FIM; hora++) {
        for (let minuto = 0; minuto < 60; minuto += INTERVALO) {
            const h = hora.toString().padStart(2, "0");
            const m = minuto.toString().padStart(2, "0");
            const horario = `${h}:${m}`;

            if (ocupados.includes(horario)) continue;

            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            horaSelect.appendChild(option);
        }
    }
}

// ==============================
// CONFIRMAR AGENDAMENTO
// ==============================
async function confirmar() {
    const servico = servicoSelect.value;
    const data = dataInput.value;
    const hora = horaSelect.value;

    if (!servico || !data || !hora) {
        alert("Preencha todos os campos");
        return;
    }

    const valor =
        servicoSelect.options[servicoSelect.selectedIndex].dataset.valor;

    try {
        await salvarAgendamento({
            servico,
            valor,
            data,
            hora
        });

        alert("Agendamento confirmado!");
        window.location.href = "agendamentos.html";
    } catch (e) {
        console.error(e);
    }
}

// ==============================
// EVENTOS
// ==============================
dataInput.addEventListener("change", gerarHorariosDisponiveis);
