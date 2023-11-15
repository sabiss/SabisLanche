const baseUrl = "http://localhost:3000";

document.querySelector(".overlay").classList.add("show"); //efeito de esmaecer par ao aviso na página
function fecharAviso() {
  document.getElementById("aviso").style.display = "none";
}

async function enviar(acao) {
  const email = document.querySelector("input#email").value;
  const senha = document.querySelector("input#senha").value;

  const dados = { email: email, senha: senha };

  switch (acao) {
    case "logar":
      const respostaLogin = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(dados),
      });
      const retornoApi = await respostaLogin.json();
      if (retornoApi.login === true) {
        localStorage.setItem(retornoApi.token, "token");
        window.location.href = "../index.html";
      } else {
        mostrarMessage(retornoApi.message);
      }
      break;
    case "cadastrar":
      const respostaCadastro = await fetch(`${baseUrl}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(dados),
      });

      const message = await respostaCadastro.json();
      mostrarMessage(message.message);
      break;
  }
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