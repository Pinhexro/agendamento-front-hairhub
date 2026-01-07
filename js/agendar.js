document.getElementById("form-agendamento").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

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
            if (!res.ok) {
                throw new Error("Horário ocupado");
            }
            return res.json();
        })
        .then(() => {
            // 🔑 SALVA O TELEFONE
            localStorage.setItem("telefone", telefone);

            // REDIRECIONA
            window.location.href = "meus-agendamentos.html";
        })
        .catch(() => {
            alert("Horário já ocupado");
        });
});
