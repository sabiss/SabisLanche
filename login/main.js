const baseUrl = "http://localhost:3000";

document.querySelector(".overlay").classList.add("show"); //efeito de esmaecer par ao aviso na página
function fecharAviso() {
  document.getElementById("aviso").style.display = "none";
}

async function logar() {
  const email = document.querySelector("input#email").value;
  const senha = document.querySelector("input#senha").value;
  const dados = { email: email, senha: senha };
  console.log(dados);
  const resposta = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(dados),
  });
  console.log(resposta);
}

async function cadastrar() {}
