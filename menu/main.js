const baseUrl = "http://localhost:3000";
window.addEventListener("load", paginaCarregou);

function paginaCarregou() {
  formarCard();
}
function getPayload() {
  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload;
}
async function getPedidos() {
  const payload = getPayload();
  const idUsuario = payload.id;
  try {
    const retornoApi = await fetch(`${baseUrl}/pedidos/${idUsuario}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    const pedidos = await retornoApi.json();
    return pedidos;
  } catch (error) {
    mostrarMessage(error.message);
  }
}
async function formarCard() {
  showLoader();
  const pedidos = await getPedidos();
  const cardContainer = document.querySelector("main#cardsContainer");
  if (pedidos.pedidos == false) {
    cardContainer.innerHTML =
      '<div class="card d-flex justify-content-center align-items-center" style="width: 18rem"><p>Sem Pedidos</p></div>';
  } else {
    cardContainer.innerHTML = "";
    for (let pedido of pedidos) {
      cardContainer.innerHTML += `
      <div class="card mt-4" style="width: 18rem">
          <div class="card-body">
            <h5 class="negrito">Pedido #${pedido.id}</h5>
          </div>
          <ul class="list-group list-group-flush listaPedidos">
            <li class="list-group-item">${pedido.nome}</li>
          </ul>
          <div class="card-body d-flex flex-column observacoes">
            <h5 class="negrito">Observaçoes:</h5>
            <p>${pedido.observacao}</p>
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="negrito preco">Preço: R$${pedido.preco},00</h6>
          </div>
          <div class="card-body d-flex flex-column">
            <button
              type="button"
              class="btn btn-primary mb-2" onclick="deletarPedido(${pedido.id})"
            >
              Concluir ou Cancelar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalEdicao"
            >
              Editar
            </button>
          </div>
        </div>`;
    }
  }
  hideLoader();
}
function verificarRadioSelecionado() {
  // Obtém todos os elementos de input do tipo radio dentro da div mãe
  const radios = document.querySelectorAll('.modal-body input[type="radio"]');

  // Percorre os radios para encontrar o selecionado
  for (const radio of radios) {
    if (radio.checked) {
      // O radio está marcado, faça algo com ele
      return radio.value;
    }
  }
}
async function deletarPedido(id) {
  try {
    await fetch(`${baseUrl}/deletarPedido/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
  } catch (error) {
    alert(error.message);
  }
  formarCard();
}
async function fazerPedido() {
  const idProduto = verificarRadioSelecionado();
  const payload = await getPayload();
  const idUsuario = payload.id;
  const observacao = document.querySelector(
    "textarea#observacaoCadastroPedido"
  ).value;

  try {
    const retornoApi = await fetch(`${baseUrl}/fazerPedido`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario: idUsuario,
        idProduto: idProduto,
        observacao: observacao,
      }),
    });
    const message = await retornoApi.json();
    mostrarMessage(message.message);
    await formarCard();
  } catch (error) {
    mostrarMessage(error.message);
  }
}
function logout() {
  localStorage.clear();
  window.location.href = "../index.html";
}
function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}
function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}
function mostrarMessage(message) {
  const card = document.getElementById("alerta");
  const texto = document.getElementById("alert-text");

  texto.innerHTML = message;
  card.style.display = "flex";

  setTimeout(() => {
    card.style.display = "none";
  }, 5000);
}
function fecharAviso() {
  document.getElementById("aviso").style.display = "none";
}
