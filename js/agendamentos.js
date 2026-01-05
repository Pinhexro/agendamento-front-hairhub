document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-agendamentos");

  if (!lista) {
    console.error("Elemento #lista-agendamentos não encontrado");
    return;
  }

  const agendamentos = getAgendamentos();

  lista.innerHTML = "";

  if (agendamentos.length === 0) {
    lista.innerHTML = "<li>Nenhum agendamento encontrado</li>";
    return;
  }

  agendamentos.forEach((a, index) => {
    const li = document.createElement("li");

    // 🔹 CLASSE NECESSÁRIA PARA O CSS
    li.classList.add("agendamento");

    li.innerHTML = `
      <div class="agendamento-info">
        <strong>${a.servico}</strong>
        <span>Data: ${a.data}</span>
        <span>Hora: ${a.hora}</span>
      </div>
      <button onclick="cancelar(${index})">Cancelar</button>
    `;

    lista.appendChild(li);
  });
});

function cancelar(index) {
  if (confirm("Deseja cancelar este agendamento?")) {
    removerAgendamento(index);
    location.reload();
  }
}
