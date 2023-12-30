const baseUrl = "http://localhost:3000";
window.addEventListener("load", paginaCarregou);

function paginaCarregou() {
  verificaValidadoToken();
  formarCard();
}
function getPayload() {
  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload;
}
async function listarProdutos(modal) {
  let formsProdutos = "";
  let idTextarea = "";
  switch (modal) {
    case "modalCadastro":
      formsProdutos = document.querySelector("div.modalCadastro");
      idTextarea = "observacaoCadastro";
      break;
    case "modalEdicao":
      formsProdutos = document.querySelector("div.modalEdicao");
      idTextarea = "observacaoEdicao";
      break;
  }
  try {
    const respostaApi = await fetch(`${baseUrl}/listarProdutos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    const listarProdutos = await respostaApi.json();
    formsProdutos.innerHTML = "";
    for (let produto of listarProdutos) {
      formsProdutos.innerHTML += `
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          value="${produto.id}"
          id="${produto.nome}"
          name="produto"
        />
        <label class="form-check-label" for="${produto.nome}">
          ${produto.nome} <span class="preco">R$ ${produto.preco}</span>
        </label>
      </div>`;
    }
    formsProdutos.innerHTML += `
    <div class="mb-3 mt-3">
      <label for="exampleFormControlTextarea1" class="form-label"
        >Obserções sobre o preparo do pedido</label
      >
      <textarea
        class="form-control"
        id='${idTextarea}'
        rows="3"
      ></textarea>
    </div>`;
  } catch (error) {
    mostrarMessage(error.message);
  }
}
function verificaValidadoToken() {
  const payload = getPayload();
  if (payload.exp) {
    const expDate = new Date(payload.exp * 1000); // Multiplicando por 1000 para converter segundos em milissegundos
    const dataHoje = new Date();

    if (expDate < dataHoje) {
      localStorage.clear();
      window.location.href = "../../index.html";
    }
  }
}
async function getPedidos() {
  const payload = getPayload();
  const id = payload.id;
  try {
    const retornoApi = await fetch(`${baseUrl}/listarSeusPedidos/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    if (retornoApi.ok) {
      const pedidos = await retornoApi.json();
      return pedidos;
    } else {
      const mensagemDeErro = await retornoApi.json();
      mostrarMessage(mensagemDeErro.message);
    }
  } catch (error) {
    mostrarMessage(error.message);
  }
}
async function getProduto(id) {
  try {
    const retornoApi = await fetch(`${baseUrl}/listarUmProduto/${id}`);
    if (retornoApi.ok) {
      const produto = await retornoApi.json();
      return produto;
    } else {
      const mensagemDeErro = await retornoApi.json();
      mostrarMessage(mensagemDeErro.message);
    }
  } catch (error) {
    mostrarMessage(error.messase);
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
      const produto = await getProduto(pedido.id_produto);
      cardContainer.innerHTML += `
      <div class="card mt-4" style="width: 18rem">
          <div class="card-body">
            <h5 class="negrito">Pedido #${pedido.id}</h5>
          </div>
          <ul class="list-group list-group-flush listaPedidos">
            <li class="list-group-item">${produto.nome}</li>
          </ul>
          <div class="card-body d-flex flex-column observacoes">
            <h5 class="negrito">Observaçoes:</h5>
            <p>${pedido.observacao}</p>
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="negrito preco">Preço: R$${produto.preco}</h6>
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
              onclick="recolocarValores(${pedido.id})"
            >
              Editar
            </button>
          </div>
        </div>`;
    }
  }
  hideLoader();
}
let idDoPedidoQueSeraAtualizado;

async function editarPedido() {
  const novoIdProduto = verificarRadioSelecionado();
  const novaObservacao = document.querySelector(
    "textarea#observacaoEdicao"
  ).value;
  try {
    const respostaApi = await fetch(`${baseUrl}/atualizarPedido`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        idPedido: idDoPedidoQueSeraAtualizado,
        novoIdProduto: novoIdProduto,
        novaObservacao: novaObservacao,
      }),
    });
    const message = await respostaApi.json();
    fechaModal("modalEdicao");
    await formarCard();
    mostrarMessage(message.message);
  } catch (error) {
    mostrarMessage(error.message);
  }
}
async function recolocarValores(idPedido) {
  await listarProdutos("modalEdicao");
  idDoPedidoQueSeraAtualizado = idPedido;
  const respostaApi = await fetch(`${baseUrl}/listarUmPedido/${idPedido}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });
  const pedido = await respostaApi.json();
  remarcarRadio(pedido.idProduto);
  const textAreaObservacao = document.querySelector(
    "textarea#observacaoEdicao"
  );
  textAreaObservacao.value = pedido.observacao;
  pedidoParaEditar = pedido.idPedido;
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
function remarcarRadio(valueDoRadioParaMarcar) {
  const radios = document.querySelectorAll('.modal-body input[type="radio"]');

  for (const radio of radios) {
    if (radio.value == valueDoRadioParaMarcar) {
      radio.checked = true;
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
    "textarea#observacaoCadastro"
  ).value;

  try {
    const retornoApi = await fetch(`${baseUrl}/fazerPedido`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario: idUsuario,
        idProduto: idProduto,
        observacao: observacao,
      }),
    });
    const message = await retornoApi.json();
    fechaModal("modalCadastro");
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
function fechaModal(modalEspecifico) {
  //fecha os modais de formulários
  let modalParaFechar;
  switch (modalEspecifico) {
    case "modalCadastro":
      modalParaFechar = document.querySelector("#modalCadastro");
      break;
    case "modalEdicao":
      modalParaFechar = document.querySelector("#modalEdicao");
      break;
  }
  const modal = bootstrap.Modal.getInstance(modalParaFechar);
  modal.hide();
}
