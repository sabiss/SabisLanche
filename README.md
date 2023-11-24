<h1>CRUD Para controle de pedidos de uma Lanchonete Delivery</h1>

<p>Contando com as tecnologias de javascript, html, css e o framework Bootstrap, O sabisLanche é um site que registrar pedidos que estão sendo guardados em uma API. Estão sendo utilizados os verbos de controle como post, put e delete</p>
<br>

<h2>Como Fazer o Site Funcionar</h2>

Para executar o site localmente, siga estes passos simples:

1. **Baixe o Repositório:**

   - Faça o download ou clone este repositório em sua máquina local.

2. **Entre na Pasta do Projeto:**

   - Navegue até o diretório do projeto usando o terminal ou prompt de comando.

3. **Instale as Dependências:**

   - Execute o seguinte comando para instalar as dependências necessárias:
     ```bash
     npm install
     ```

4. **Inicie o Servidor de Desenvolvimento:**

   - Após a conclusão da instalação, inicie o servidor de desenvolvimento com o seguinte comando:
     ```bash
     npm run dev
     ```

5. **Aguarde a Confirmação de que a API Está Rodando:**

   - Assim que a API estiver rodando, você receberá uma mensagem no terminal indicando que está pronta para ser usada.

6. **Pronto:**
   - O site agora está funcionando localmente. Abra o navegador e acesse o endereço indicado pelo servidor de desenvolvimento para interagir com o site.

Certifique-se de que todas as etapas foram concluídas corretamente para garantir o funcionamento adequado do site em seu ambiente local.

<h2>Funcionalidades</h2>
<h3>Página como um todo</h3>
<p>O site conta com um visual temático de fast Foods e bem fácil de usar</p>
<img src ="./assets/midias-README/página.png" alt="Imagem da página como um todo">
<h3>Cadastro de dados</h3>
<p>Ao clicar no votão redondo, amarelo e com símbolo de adição, o usuário é apresentado ao modal forms de cadastro de pedidos onde irá preencher seu nome, telefone, endereço e quais os produtos deseja pedir</p>
<img src ="./assets/midias-README/modalCadastro.png" alt="Imagem do formulário de cadastro de pedidos">
<h3>Edição dos pedidos já registrados</h3>
<p>Ao clicar no botão verde presente dentro do card do pedido, o usuário é apresentado à um forms semelhante ao usado para o cadastro de pedidos, mas este já vem com as informações do pedido registrado. Sendo assim, apenas esperando o usuário registrar uma alteração nessas informações</p>
<img src ="./assets/midias-README/modalEdicao.png" alt="Imagem do formulário de edição das informações de um pedido já registrado">
<h3>Concluir/Deletar pedido</h3>
<p>Para concluir ou deletar um pedido basta clicar no botão azul localizado dentro do card do pedido que ele automaticamente sumirá da página e do registro na API</p>
<img src="./assets/midias-README/concluirOuDeletar.png" alt="Imagem da página como uma toda com a presença de uma seta indicando onde é o botão de concluir ou deletar">
