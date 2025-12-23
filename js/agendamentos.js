// ==============================
// PROTEGER TODOS AS PÁGINAS
// ==============================
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const lista = document.getElementById("lista");

async function carregar() {
  lista.innerHTML = "";
  const agendamentos = await listarAgendamentos();

  if (agendamentos.length === 0) {
    lista.innerHTML = "<p>Nenhum agendamento.</p>";
    return;
  }

  agendamentos.forEach(a => {
    const div = document.createElement("div");
    div.className = "agendamento";
    div.innerHTML = `
      <strong>${a.servico}</strong><br>
      R$ ${a.valor}<br>
      ${a.data} - ${a.hora}<br>
      <button onclick="cancelar('${a.id}')">Cancelar</button>
    `;
    lista.appendChild(div);
  });
}

async function cancelar(id) {
  if (!confirm("Deseja cancelar este agendamento?")) return;
  await cancelarAgendamento(id);
  carregar();
}

carregar();
