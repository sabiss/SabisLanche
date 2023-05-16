const listaClientes = [];
let idCounter = 0;
class Cliente{
    constructor(nome, telefone, id){
        this.nome = nome
        this.telefone = telefone
        this.id = id;
    }
}

function addClient(){
    const nome = document.querySelector('input#nomeCadastro').value;
    const telefone = document.querySelector('input#telefoneCadastro').value;
    const cliente = new Cliente(nome, telefone);
    listaClientes.push(cliente);
    createClientContainer(nome, telefone, idCounter);
    idCounter++;
    alert("cliente cadastrado!");
    const formCadastro = document.querySelector("form.formCadastro");
    formCadastro.reset();
    changeDisplay('telaInicio');

}

function changeDisplay(display){
    const containerClients = document.querySelector("div.container");
    const containerAdd = document.querySelector("div.container-add");
    const formCadastro = document.querySelector("form.formCadastro");
    switch (display){
        case "formularioCadastro":
            containerClients.style.display="none";
            containerAdd.style.display = "none";
            formCadastro.style.display="flex";
            break;
        case "telaInicio":
            containerClients.style.display="flex";
            containerAdd.style.display = "flex";
            formCadastro.style.display="none";
            break;
    }
}
function createClientContainer(nome, telefone){
    const fatherDiv = document.querySelector('div.container');
    const clientDiv = document.createElement('div');
    clientDiv.className="client";
    const pID = document.createElement('p');
    const pNome = document.createElement('p');
    const pTelefone = document.createElement('p');

    pID.appendChild(document.createTextNode(idCounter--));
    pNome.appendChild(document.createTextNode(nome));
    pTelefone.appendChild(document.createTextNode(telefone));

    const containerActionButtons = document.createElement('div');
    containerActionButtons.className = 'container-actionButton';

    const yellowButton = document.createElement('div');
    const redButton = document.createElement('div');
    yellowButton.className="actionButton yellow";
    redButton.className="actionButton red";
    yellowButton.appendChild(document.createTextNode("Edit"));
    redButton.appendChild(document.createTextNode("Del"));

    containerActionButtons.appendChild(yellowButton);
    containerActionButtons.appendChild(redButton);

    clientDiv.appendChild(pID);
    clientDiv.appendChild(pNome);
    clientDiv.appendChild(pTelefone);
    clientDiv.appendChild(containerActionButtons);

    fatherDiv.appendChild(clientDiv);
}