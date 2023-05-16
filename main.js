
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
    createClientContainer(nome, telefone, listaClientes.length - 1);
    idCounter++;
    alert("cliente cadastrado!");
    const formCadastro = document.querySelector("form.formCadastro");
    formCadastro.reset();
    changeDisplay('telaInicio');

}
let indexClientToChange=null;

function changeDisplay(display, indexHelper){
    const containerClients = document.querySelector("div.container");
    const containerAdd = document.querySelector("div.container-add");
    const formCadastro = document.querySelector("form.formCadastro");
    const formEdit = document.querySelector('form.formEdit')
    const arrowContainer = document.querySelector('div.arrowContainer');
    switch (display){
        case "formularioCadastro":
            containerClients.style.display="none";
            containerAdd.style.display = "none";
            formCadastro.style.display="flex";
            arrowContainer.style.display='flex';
            break;
        case "telaInicio":
            containerClients.style.display="flex";
            containerAdd.style.display = "flex";
            formCadastro.style.display="none";
            formEdit.style.display="none";
            arrowContainer.style.display='none'
            break;
        case 'formularioEdit':
            containerClients.style.display="none";
            containerAdd.style.display = "none";
            formEdit.style.display = 'flex';
            arrowContainer.style.display='flex';
            indexClientToChange = indexHelper;
            break;
    }
}
function createClientContainer(){
    const fatherDiv = document.querySelector('div.container');
    fatherDiv.innerHTML = "";
    for(let i = 0; i < listaClientes.length; i++){
        const clientDiv = document.createElement('div');
        clientDiv.className="client";
        const pID = document.createElement('p');
        const pNome = document.createElement('p');
        const pTelefone = document.createElement('p');

        pID.appendChild(document.createTextNode(i));
        pNome.appendChild(document.createTextNode(listaClientes[i].nome));
        pTelefone.appendChild(document.createTextNode(listaClientes[i].telefone));

        const containerActionButtons = document.createElement('div');
        containerActionButtons.className = 'container-actionButton';

        const yellowButton = document.createElement('div');
        const redButton = document.createElement('div');
        yellowButton.className="actionButton yellow";
        redButton.className="actionButton red";
        yellowButton.appendChild(document.createTextNode("Edit"));
        redButton.appendChild(document.createTextNode("Del"));

        yellowButton.addEventListener("click", () => changeDisplay('formularioEdit',i));
        redButton.addEventListener("click", () => deleteClient(i));

        containerActionButtons.appendChild(yellowButton);
        containerActionButtons.appendChild(redButton);

        clientDiv.appendChild(pID);
        clientDiv.appendChild(pNome);
        clientDiv.appendChild(pTelefone);
        clientDiv.appendChild(containerActionButtons);

        const caption = document.createElement('div');
        caption.className="caption";

        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        const p3 = document.createElement('p')
        const p4 = document.createElement('p')
        p1.appendChild(document.createTextNode("ID"))
        p2.appendChild(document.createTextNode("NOME"))
        p3.appendChild(document.createTextNode("TELEFONE"))
        p4.appendChild(document.createTextNode("AÇAÕ"))

        caption.appendChild(p1);
        caption.appendChild(p2);
        caption.appendChild(p3);
        caption.appendChild(p4);

        fatherDiv.appendChild(caption);
        fatherDiv.appendChild(clientDiv);
    }
    
    
}
function editClient(){
    const checkedRadio = document.querySelector('input[name="campo"]:checked').value;
    const newValue = document.querySelector('input#novoValor').value;

    switch(checkedRadio){
        case 'nome':
            listaClientes[indexClientToChange].nome = newValue;
            break;
        case 'telefone':
            listaClientes[indexClientToChange].telefone = newValue;
            break;
    }
    const formEdit = document.querySelector('form.formEdit')
    formEdit.reset();
    alert("Cliente Editado!");
    changeDisplay('telaInicio');
    createClientContainer();
}
function deleteClient(index){
    listaClientes.splice(index,1);
    createClientContainer();
    alert("Cliente Excluído com sucesso!")
}