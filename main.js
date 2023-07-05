const baseUrl = 'https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/{20201214010012}/products';
pegarPedidos();

function cadastrar(){
    const nomeDestinatario = document.querySelector('input#nome')
    const telefone = document.querySelector('input#telefone')
    const rua = document.querySelector('input#telefone')
    const bairro = document.querySelector('input#bairro')
    const numero = document.querySelector('input#numero')
    const pedidos = recebePedidos();

    const pedido = {
        "nomeDestinataro": nomeDestinatario.value,
        "rua":rua.value,
        "bairro":bairro.value,
        "numero":numero.value,
        "telefone": telefone.value,
        "pedido": pedidos
    }
    fechaModal();
    criarCard(pedido);
}

function criarCard(pedido){
    const card = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Pedido #0</h5>
          <p class="card-text"><span class="negrito">Endereço: </span>${pedido.rua}<br><span class="negrito">Bairro:</span> ${pedido.bairro}<br><span class="negrito">Número:</span> ${pedido.numero}</p><span class="negrito">Destinatário:</span><p> ${pedido.nomeDestinatario}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${pedido.pedidos[0]}</li>
        </ul>
        <div class="card-body d-flex flex-column ">
          <button type="button" class="btn btn-danger mb-2" >Cancelar Pedido</button>
          <button type="button" class="btn btn-success">Pedido Concluído</button>
        </div>
    </div>
    `;
    const cardContainer = document.querySelector('main#cardsContainer');
    cardContainer.innerHTML+=card;
}
function fechaModal(){
    const m = document.querySelector("#exampleModal");
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
}
function recebePedidos(){//pega todas as checkbox marcadas e manda para uma lista
    const pedidos = [];
    const ordens = document.querySelectorAll('input[type="checkbox"]');
    console.log(ordens)
    for(let ordem of ordens){
        if(ordem.checked){
            pedidos.push(ordem);
        }
    }
    return pedidos;
}

async function pegarPedidos(){
    try {
        const response = await fetch(baseUrl)
        const dados = await response.json();
        console.log(dados);
    }
    catch(error){
        console.log(error)
    }
    
}
const handlePhone = (event) => {//máscara para formatar o telefone no padrão (00) 00000-0000 enquanto é digitado
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}