const telefone = localStorage.getItem("telefone");

if (!telefone) {
    alert("Nenhum telefone encontrado.");
    window.location.href = "index.html";
}

// Buscar agendamentos do backend
fetch(`https://agendamento-hairhub-urkz.onrender.com/agendamentos/telefone/${telefone}`)
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lista-agendamentos");
        lista.innerHTML = "";

        if (dados.length === 0) {
            lista.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
            return;
        }

        dados.forEach(item => {
            const div = document.createElement("div");

            div.innerHTML = `
                <p><strong>Serviço:</strong> ${item.servico}</p>
                <p><strong>Data:</strong> ${item.data}</p>
                <p><strong>Hora:</strong> ${item.hora}</p>
                <button onclick="cancelarAgendamento('${item._id}')">
                    Cancelar
                </button>
                <hr>
            `;

            lista.appendChild(div);
        });
    })
    .catch(() => {
        alert("Erro ao buscar agendamentos");
    });

// Função de cancelamento
function cancelarAgendamento(id) {
    if (!confirm("Deseja realmente cancelar este agendamento?")) return;

    fetch(`https://agendamento-hairhub-urkz.onrender.com/agendamentos/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(() => {
            alert("Agendamento cancelado com sucesso!");
            location.reload();
        })
        .catch(() => {
            alert("Erro ao cancelar agendamento");
        });
}
