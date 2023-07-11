const baseUrl = 'https://649a1d4a79fbe9bcf8404b5a.mockapi.io/users/20201214010012/products';
formarCard();
let idDoPedidoParaEditar;//variável global usada para auxiliar na função EDITARPEDIDO()

cardapio = [{produto: "Hamburguer", preco: 15}, {produto:"Milkshake", preco:10}, {produto:"Batata Frita", preco: 9}, {produto: "Refrigerante", preco: 7}];

async function getPedidos(){//busca todos os pedidos salvos na api
    try{
        const response = await fetch(baseUrl);
        const dados = await response.json()
        return dados;
    }catch(error){
        alert("Erro ao solicitar lsita de pedidos no sistema: " + error)
    }
    
}

async function enviaPedido(pedido){//envia os novos pedidos para a api
    try {
        await fetch(baseUrl, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedido)
        });
      } catch (error) {
        console.log(error)
      }
}
async function concluirPedido(id){//deleta um pedido em específico na api
    try {
        await fetch(baseUrl + "/" + id, { method: "DELETE" });
    }
    catch(error){
        console.log("Vixi, Deu erro: " + error);
    }
    formarCard();
}
async function editarPedido(){
    const nomeDestinatario = document.querySelector('input#nomeEdicao')
    const telefone = document.querySelector('input#telefoneEdicao')
    const rua = document.querySelector('input#ruaEdicao')
    const bairro = document.querySelector('input#bairroEdicao')
    const numero = document.querySelector('input#numeroEdicao')
    const checkboxs = document.querySelectorAll('input[type="checkbox"].checkboxEdicao');

    const listaPedidos = validarMarcacaoDosPedidos(checkboxs);

    if(listaPedidos != false){
        const novaOrdemDoPedido = {
            "nomeDestinatario": nomeDestinatario.value,
            "telefone": telefone.value,
            "rua": rua.value,
            "bairro":bairro.value,
            "numero":numero.value,
            "pedidos": listaPedidos 
        }
        try{
            const response = await fetch(baseUrl + "/" + idDoPedidoParaEditar, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaOrdemDoPedido)
            });
            fechaModal("modalEdicao");
        }catch(error){
            alert(`Erro ao enviar edição de pedido: ${error}`)
        }
        
    }else{
        alert("Ocorreu um erro");
    }
    formarCard()
}
async function recolocarValoresNosCampos(id){
    let checkboxs = document.querySelectorAll('input[type="checkbox"].checkboxEdicao');

    try{
        const listaDePedidosNoSistema = await getPedidos()
        const pedidoParaEditar = listaDePedidosNoSistema.filter(p => p.id == id)//poem dentro da variável o pedido que possui o id igual ao do parâmetro da função

        const pedidosDoCliente = pedidoParaEditar[0].pedidos
        
        const produtos = [];//aqui estarão todos os values dos checkboxs de produtos marcados

        for(let i = 0; i < checkboxs.length; i++){//marcando os checkboxs que estavam marcados no pedido
            for(let e = 0; e < pedidosDoCliente.length; e++){
                if(checkboxs[i].value == pedidosDoCliente[e]){
                    checkboxs[i].checked = true;
                    produtos.push(checkboxs[i].value)
                }
            }
            
        }
        //recolocando os valores do pedido nos campos inputs
        const nomeDestinatario = document.querySelector('input#nomeEdicao').value = pedidoParaEditar[0].nomeDestinatario
        const telefone = document.querySelector('input#telefoneEdicao').value = pedidoParaEditar[0].telefone
        const rua = document.querySelector('input#ruaEdicao').value = pedidoParaEditar[0].rua
        const bairro = document.querySelector('input#bairroEdicao').value = pedidoParaEditar[0].bairro
        const numero = document.querySelector('input#numeroEdicao').value = pedidoParaEditar[0].numero
        idDoPedidoParaEditar = pedidoParaEditar[0].id
    }catch(error){
        console.log("erro na função [recolocarValoresNosCampos]: " + error)
    }
}
async function cadastrar(){
    const nomeDestinatario = document.querySelector('input#nome')
    const telefone = document.querySelector('input#telefone')
    const rua = document.querySelector('input#rua')
    const bairro = document.querySelector('input#bairro')
    const numero = document.querySelector('input#numero')
    let pedidos = document.querySelectorAll('input[type="checkbox"]');
    const listaDePedidos = validarMarcacaoDosPedidos(pedidos);
    const precoTotal = calcularPrecoTotal(listaDePedidos)

    if(listaDePedidos == false){//se não tiver pedidos marcados
        alert("Marque pelo menos um pedido");
    }else{//se tiver pedidos marcados
        const ordemDoPedido = {
            "nomeDestinatario": nomeDestinatario.value,
            "telefone": telefone.value,
            "rua": rua.value,
            "bairro":bairro.value,
            "numero":numero.value,
            "pedidos": listaDePedidos,
            "preco": precoTotal
        }
        try{
            await enviaPedido(ordemDoPedido)
        }catch(error){
            alert("Erro ao cadastrar pedido:" + error)
        }
        
        limparCampo(nomeDestinatario, "value");
        limparCampo(telefone, "value");
        limparCampo(rua, "value");
        limparCampo(bairro, "value");
        limparCampo(numero, "value");
        limparCampo(pedidos, "checkbox")
        formarCard();
        fechaModal("modalCadastro");
    }
}

async function formarCard(cardsEspecificos = null){//percorre a lista de pedidos no sistema e forma o card html deles um por um
    let pedidos;
    cardsEspecificos != null? pedidos = cardsEspecificos : pedidos = await getPedidos();//verifica se é pra exibir todos os cards ou outros em específico

    const cardContainer = document.querySelector("main#cardsContainer");
    limparCampo(cardContainer, "html");

    for(let pedido of pedidos){//percorre objeto por objeto e preenche o html
        cardContainer.innerHTML += `
        <div class="card mt-4" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title" style="border-bottom: solid grey 1px">Pedido #${pedido.id-1}</h5>
                <p><span class="negrito">Nome do Destinatário: </span>${pedido.nomeDestinatario}</p>
                <p class="card-text"><span class="negrito">Rua: </span>${pedido.rua}
                <p><span class="negrito">Bairro: </span>${pedido.bairro}</p>
                <p><span class="negrito">Número: </span>${pedido.numero}</p>
                <p><span class="negrito">Preço Total: </span>${pedido.preco}</p>
            </div>
            <ul class="list-group list-group-flush">
                ${pedido.pedidos[0]?`<li class="list-group-item">${pedido.pedidos[0]}</li>`:''}
                ${pedido.pedidos[1]?`<li class="list-group-item">${pedido.pedidos[1]}</li>`:''}
                ${pedido.pedidos[2]?`<li class="list-group-item">${pedido.pedidos[2]}</li>`:''}
                ${pedido.pedidos[3]?`<li class="list-group-item">${pedido.pedidos[3]}</li>`:''}
            </ul>
            <div class="card-body d-flex flex-column ">
                <button type="button" class="btn btn-primary mb-2" onclick="concluirPedido(${pedido.id})">Concluir ou Cancelar</button>
                <button type="button" class="btn btn-success " onclick="recolocarValoresNosCampos(${pedido.id})" data-bs-toggle="modal" data-bs-target="#modalEdicao">Editar</button>
            </div>
      </div>`
    }
}
async function buscarPedidos(){//a cada letra digitada ele busca no sistema se em algum card com aquela letra do nome do destinatário
    console.log("digitando")
    const barraDePesquisa = document.querySelector('input#busca');

    try{
        if(barraDePesquisa.value == ""){
            formarCard()
        }else{
            const listaDePedidosNoSistema = await fetch(baseUrl + '/' + '?nomeDestinatario='+ barraDePesquisa.value);
            const pedidos = await listaDePedidosNoSistema.json()
            formarCard(pedidos)
        }
    }catch(error){
        console.log("Erro ao buscar: " + error);
    }
}
//máscara para telefone
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
function organizarPedidos(domDosPedidos){//percorre o dom dos inputs checkboxs e retorna somente os marcados como check
    const produtosMarcados = [];
    for(let pedido of domDosPedidos){
        if(pedido.checked){
            produtosMarcados.push(pedido.value)
        }
    }
    return produtosMarcados
    
}
function fechaModal(modalEspecifico){//fecha os modais de formulários
    let m;
    switch(modalEspecifico){
        case "modalCadastro":
            m = document.querySelector("#modalCadastro");
            break;
        case "modalEdicao":
            m = document.querySelector("#modalEdicao");
            break
    }
    const modal = bootstrap.Modal.getInstance(m);
    modal.hide();
}
function validarMarcacaoDosPedidos(pedidos){//verifica se há pedidos marcados
    const listaDePedidosMarcados = organizarPedidos(pedidos);//pega os marcados
    if(listaDePedidosMarcados.length == 0){//não tem marcados
        return false;
    }else{//tem marcados
        return listaDePedidosMarcados;
    }
}
function limparCampo(campo, parametroASerLimpo=null){//limpa o innerhtml de divs ou o values de inputs 
    switch(parametroASerLimpo){
        case "html":
            campo.innerHTML="";
            break;
        case "value":
            campo.value = "";
            break;
        case "checkbox":
            for(let box of campo){
                box.checked.false;
            }
            break;
    }
    if(parametroASerLimpo == "html"){
        
    }else{
        campo.value = "";
    }
    
}
function calcularPrecoTotal(produtosComprados){//vê quais produtos foram comprados, quais seus preços, soma tudo e retorna
    let precoTotal = 0;

    for(produtoVendido of produtosComprados){
        for(produtoNoCardapio of cardapio){
            if(produtoVendido == produtoNoCardapio.produto){
                precoTotal+=produtoNoCardapio.preco;
            }
        }
    }
    return precoTotal;
}
    
