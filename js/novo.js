function confirmar() {
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const telefone = document.getElementById("telefone").value;

    // Validações básicas
    if (!servico || !data || !hora || !telefone) {
        alert("Preencha todos os campos");
        return;
    }

    fetch("https://agendamento-hairhub-urkz.onrender.com/agendamentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: "Cliente",
            telefone: telefone,
            servico: servico,
            data: data,
            hora: hora
        })
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.error || "Erro ao agendar");
                });
            }
            return res.json();
        })
        .then(() => {
            // salva telefone para usar em "Meus Agendamentos"
            localStorage.setItem("telefone", telefone);

            alert("Agendamento confirmado!");
            window.location.href = "agendamentos.html";
        })
        .catch(err => {
            alert(err.message);
        });
}
