
document.getElementById("Form").innerHTML = `
<br>
<div class="w3-container" style="width: 80%; margin: 0 auto;">

  <div class="w3-container">
         <h2>Add Produto</h2>
  </div>
<div class="w3-container w3-margin">

<p>
  <label>Url Imagem Produto</label>
  <input class="w3-input" type="text" value="http://181.215.135.83:8176/get/image/" id="imagem"></p>
</p>
<br>
<p>
  <label>Nome</label>
<input class="w3-input" type="text" id="nome"/>
</p>
<br>
<p>
<label>Preco</label>
<input class="w3-input" type="text" id="preco"/>
</p>
<br>
<p>
  <label>Descricao</label>
<input class="w3-input" type="text" id="descricao"/>
</p>
<br>
<p>
  <label>Seguimento</label>
<input class="w3-input" type="text" id="seguimento"/>
</p>
<br>
<p>
<label>Quantidade</label>
<input class="w3-input" type="text" id="quantidade"/>
</p>
<p>
<button class="w3-margin w3-btn" type="submit" onclick="salvarProduto()">SALVAR</button>
<button class="w3-margin w3-btn" onclick="redirect2()">VOLTAR</button>
</p>

</div>
</div>
`;
function salvarProduto() {
  // const fileInput = document.querySelector("#fileInput");
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

  console.log(produto)

  const url = 'http://181.215.135.83:8176/produto/salvar'

  axios.post(url, produto,
    { headers: { 'Content-Type': 'application/json', } },
  )
    .then(response => {
      console.log(response.data);
      //  document.getElementById('visualizarRespostaServidor').innerHTML =  '<h3>'+"jogadore criado: "+response.data.nome+'</h3>'
      document.getElementById('Form').innerHTML = `  
  
   <div class="w3-container w3-center" style="width:50%; margin: 4% auto;">

   <h4>produto criado com sucesso</h4>
   <div class="w3-card-4 w3-center w3-margin">
   <img class="imagem" src=${response.data.imagem} alt="Sua imagem" width="50%" height="50%">
   <div class="w3-container w3-center">
    Nome: ${response.data.descricao}<br>
    Preço: ${response.data.preco}
    </div>
    </div> 
    <button class="w3-btn" onclick="redirect2()">VOLTAR AO INICIO</button>
    <button class="w3-btn" onclick="redirect1()">ADICIONAR OUTRO PRODUTO</button>
    </div>
   `
    })
    .catch(error => {
      console.log(error);
      document.getElementById('visualizarRespostaServidor').innerHTML = '<h3>' + error + '</h3>'
    });
}

function redirect1() {
  window.location.reload();
}
function redirect2() {
  window.location.href = "./entrar.html";
}