const telefone = localStorage.getItem("telefone");

if (!telefone) {
    alert("Nenhum telefone encontrado.");
    window.location.href = "index.html";
}

fetch(`https://agendamento-hairhub-urkz.onrender.com/agendamentos/telefone/${telefone}`)
    .then(res => res.json())
    .then(dados => {
        const lista = document.getElementById("lista-agendamentos");

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
                <hr>
            `;
            lista.appendChild(div);
        });
    })
    .catch(() => {
        alert("Erro ao buscar agendamentos");
    });
 