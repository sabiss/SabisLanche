const baseUrl = "http://localhost:3000";
window.addEventListener("load", paginaCarregou);

function paginaCarregou() {
  console.log("A página foi carregada!");
  formarCard();
}

async function getPedidos() {
  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const idUsuario = payload.id;
  try {
    const retornoApi = await fetch(
      `http://localhost:3000/pedidos/${idUsuario}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      }
    );

    const pedidos = await retornoApi.json(); //{preco, [array com os pedidos]}
    return pedidos;
  } catch (error) {
    alert(error.message);
  }
}
async function formarCard() {
  const pedidos = await getPedidos();
  const cardContainer = document.querySelector("main#cardsContainer");
  if (pedidos.pedidos == false) {
    cardContainer.innerHTML =
      '<div class="card d-flex justify-content-center align-items-center" style="width: 18rem"><p>Sem Pedidos</p></div>';
  } else {
    cardContainer.innerHTML = "";
    cardContainer.innerHTML += `
      <div class="card mt-4" style="width: 18rem">
          <div class="card-body">
            <h5 class="negrito">Pedido #${pedidos.id}</h5>
          </div>
          <ul class="list-group list-group-flush listaPedidos">
          </ul>
          <div class="card-body d-flex flex-column observacoes">
            <h5 class="negrito">Observaçoes:</h5>
            <p>${pedidos.observacao}</p>
          </div>
          <div class="card-body d-flex flex-column">
            <button
              type="button"
              class="btn btn-primary mb-2" onclick="deletarPedido(${pedidos.id})"
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

    const listaProdutos = document.querySelector("ul.listaPedidos");
    for (let produto of pedidos.produtos) {
      listaProdutos.innerHTML += `<li class="list-group-item">${produto}</li>`;
    }
  }
}

async function deletarPedido(id) {
  try {
    await fetch(`http://localhost:3000/deletarPedido/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
  } catch (error) {
    alert(error.message);
  }

  formarCard();
}
