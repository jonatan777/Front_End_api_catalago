
const root = document.getElementById('root')
const url = 'http://181.215.135.83:8176/produto/all';
        

fetch(url)
	.then((resp) => resp.json())
	.then(function (data) {
		let produtos = data;
		const tableBody = produtos.map((produto) => {
			return `
    <tr>
      <td><img src = ${produto.imagem} width="40" height="40"></td>
      <td>${produto.descricao} </td>
      <td>${produto.preco} </td>
      <td>
      <button   onclick="editar(${produto.id})">Editar</button>
      <button  onclick="deletarProduto(${produto.id})">Deletar</button>
      </td>
    </tr>
    `
		}).join('')
		const table = `
    <h3 class="w3-center"> Alterar produto</h3>
		<div id="tabelaEditar">
		<table class="w3-table-all w3-hoverable">

     <tr>
      <td>Imagem</td>
      <td>Nome</td>
      <td>Preço</td>
      <td>Ação</td>
     </tr>
        ${tableBody}
   </table>
	</div>
	`;
		root.insertAdjacentHTML('beforeend', table)
	})
	.catch(function (error) {
		console.log(error);
	});
/**
 * 
 * a partir da tabela preenchida envia-se um id para fazer upgrade no objeto jogador atravez de um Form
 * 
 */ 
function editar(id) {
	root.innerHTML = '';

	const url = `http://181.215.135.83:8176/produto/${id}`;
	fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			let produto = data;

			document.getElementById("FormEditar").innerHTML = `
<br>
   <div class="w3-container" id="dadosProduto">

       <div class="w3-container">
         <h2>Dados do Produto</toh2>
       </div>

	  <div class="w3-container">
        <p>
           <label>Url Imagem</label>
           <input class="w3-input" type="text" id="imagem" value='${produto.imagem}'></p>
        </p>
        <br>
         <p>
           <label>Nome</label>
           <input class="w3-input" type="text" id="nome" value='${produto.nome}'/>
         </p>
         <br>
         <p>
           <label>Preço</label>
           <input class="w3-input" type="text" id="preco" value='${produto.preco}'/>
         </p>
         <br>
         <p>
           <label>Descrição</label>
           <input class="w3-input" type="taxt" id="descricao" value='${produto.descricao}'/>
         </p>
         <br>
         <p>
           <label>Seguimento</label>
           <input class="w3-input" type="taxt" id="seguimento" value='${produto.seguimento}'/>
         </p>
         <br>
         <p>
           <label>Quantidade</label>
           <input class="w3-input" type="text" id="quantidade" value='${produto.quantidade}'/>
         </p>
        
         <br>
         <p>
			  <button class="w3-margin" type="submit" onclick="salvarEdicao(${produto.id})">Salvar Edição</button>
        <button class="w3-margin" type="submit" onclick="redirect4()">voltar</button>
        </p>
      </div>
   </div>
   `;
		})
		.catch(function (error) {
			console.log(error);
		});
}
/*
 * depois de fazer as modificações no objeto e chamado o metodo salvarEdicao() com o (id) do objeto modificado 
 * para ser enviado para a API.
 * se tudo estiver certo a resposta da API sera impresa na tela com o objeto modificado.
 */ 
function salvarEdicao(id) {
	var imagem = document.getElementById('imagem').value
	var nome = document.getElementById('nome').value
	var preco = document.getElementById('preco').value
	var descricao = document.getElementById('descricao').value
    var seguimento = document.getElementById('seguimento').value
	var quantidade = document.getElementById('quantidade').value
	
	const produto = {
		imagem: imagem,
		nome: nome,
		preco: preco,
		descricao: descricao,
        seguimento: seguimento,
		quantidade: quantidade,
	};
	const url = `http://181.215.135.83:8176/produto/${id}`
  
	axios.put(url, produto, 
		 { headers: {'Content-Type': 'application/json'}},
	  )
	.then(response => {
	console.log(response.data);
    document.getElementById('visualizarRespostaServidor').innerHTML =  ''
	 document.getElementById('FormEditar').innerHTML = `  
	 <div class="w3-container w3-center" style="width:50%; margin: 4% auto;">
	 <h3>Produto modificado com sucesso</h3>
	 <div class="w3-card-4 w3-center w3-margin">
	     <img class="imagem" src=${response.data.imagem} alt="Sua imagem" width="50%" height="50%">
	 <div class="w3-container w3-center">
	  Nome: ${response.data.nome}<br>
	  Preço: ${response.data.preco}<br>
      Descrição: ${response.data.descricao}<br>
      Seguimento: ${response.data.seguimento}<br>
      Quantidade: ${response.data.quantidade}<br>
	  </div>
	  </div> 
	  <button class="w3-margin" onclick="redirect4()">Recarregar pagina</button> -------------
	  </div>
	 `
	})
	.catch(error => {
	 console.log(error);
	 document.getElementById('visualizarRespostaServidor').innerHTML =  '<h3>'+error+'</h3>'
	});
}

function deletarProduto(id){
const url = `http://181.215.135.83:8176/produto/${id}`
var re = confirm("Excluir Produto?");
if(re == false){
location.reload();
}else if(re == true){
  axios.delete(url)
    .then(response => document.getElementById('root').innerHTML =  `
	 <h1 class="w3-blue">excluído com sucesso!<h1><br>
	 <button class="w3-margin" onclick="redirect3()">recarregar pagina</button>`)
    .catch(error => {
		document.getElementById('visualizarRespostaServidor').innerHTML =  `Error: ${error.message}`;
        console.error('Houve um erro!', error);
    });
	}  	
}

function redirect3(){
    window.location.href = "http://181.215.135.83:8176/html/editarProduto.html";
}
function redirect4(){
  window.location.reload();
}  
function redirect5(){
  window.location.href = "http://181.215.135.83:8176/index.html";
} 