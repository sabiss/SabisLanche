const baseUrl = 'https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010012/products';
formarCard();
async function getPedidos(){
    const response = await fetch(baseUrl);
    const dados = await response.json()
    return dados;
}

async function enviaPedido(pedido){
    try {
        await fetch(baseUrl, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedido)
        });
      } catch (error) {
        alert("Ocorreu um erro")
        console.log(error)
      }
}
async function cancelarPedido(id){
    try {
        console.log(baseUrl+"/"+id)
        await fetch(baseUrl + "/" + id, { method: "DELETE" });
        formarCard();
    }
    catch(error){
        console.log("Vixi, Deu erro: " + error);
    }
}
function cadastrar(){
    const nomeDestinatario = document.querySelector('input#nome').value
    const telefone = document.querySelector('input#telefone').value
    const rua = document.querySelector('input#rua').value
    const bairro = document.querySelector('input#bairro').value
    const numero = document.querySelector('input#numero').value
    let pedidos = document.querySelectorAll('input[type="checkbox"]');
    pedidos = organizaPedidos(pedidos);

    ordemDoPedido = {
        "nomeDestinatario": nomeDestinatario,
        "telefone": telefone,
        "rua": rua,
        "bairro":bairro,
        "numero":numero,
        "pedidos": pedidos
    }
    enviaPedido(ordemDoPedido)
    formarCard();
    fechaModal();
}

async function formarCard(){
    const pedidos = await getPedidos();
    const cardContainer = document.querySelector("main#cardsContainer");
    for(let pedido of pedidos){//percorre objeto por objeto e preenche o html
        cardContainer.innerHTML += `
        <div class="card mt-4" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title" style="border-bottom: solid grey 1px">Pedido #${pedido.id}</h5>
                <p><span class="negrito">Nome do Destinatário: </span>${pedido.nomeDestinatario}</p>
                <p class="card-text"><span class="negrito">Rua: </span>${pedido.rua}
                <p><span class="negrito">Bairro: </span>${pedido.bairro}</p>
                <p><span class="negrito">Número: </span>${pedido.numero}</p>
            </div>
            <ul class="list-group list-group-flush">
                ${pedido.pedidos[0]?`<li class="list-group-item">${pedido.pedidos[0]}</li>`:''}
                ${pedido.pedidos[1]?`<li class="list-group-item">${pedido.pedidos[1]}</li>`:''}
                ${pedido.pedidos[2]?`<li class="list-group-item">${pedido.pedidos[2]}</li>`:''}
                ${pedido.pedidos[3]?`<li class="list-group-item">${pedido.pedidos[3]}</li>`:''}
            </ul>
            <div class="card-body d-flex flex-column ">
                <button type="button" class="btn btn-danger mb-2" onclick="cancelarPedido(${pedido.id})">Cancelar Pedido</button>
                <button type="button" class="btn btn-success"${pedido.id}>Pedido Concluído</button>
            </div>
      </div>`
    }
}
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}
const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

function organizaPedidos(domDosPedidos){//percorre o dom dos inputs checkboxs e retorna somente os marcados
    const produtosMarcados = [];
    for(let pedido of domDosPedidos){
        if(pedido.checked){
            produtosMarcados.push(pedido.value)
        }
    }
    return produtosMarcados;
}
function fechaModal(){
    const m = document.querySelector("#exampleModal");
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
}