
function salgados(){
  const url = 'http://181.215.135.83:8176/produto/all';
  console.log('salgados'+url);
  return url;
}

function doces(){
  const url = 'http://181.215.135.83:8176/get/image/all';
  console.log('doces'+url);
  return url;
}

function sanduiches(){
  const url = 'http://181.215.135.83:8176/produto/all';
  console.log('sanduiches'+url);
  return url;
}

function hamburgueres(){
  const url = 'http://181.215.135.83:8176/produto/all';
  console.log('hamburgueres'+url);
  return url;
}


fetch()
.then((resp) => resp.json())
.then(function(data) {

  let produtos = data;
  let list = document.getElementById("myList");

  produtos.forEach((produto) => {
    let li = document.createElement("li");
    li.innerHTML = `
  <div id="card"> 
    <div id="products">
            <div class="product" data-name="${produto.nome}" data-price="${produto.preco}">
              <p id="nome">${produto.nome}</p>
              <p id="preco">${produto.preco}</p>
              <img src = ${produto.imagem} width="100" height="220"></img>
            </div>
             <br>
             <button class="add-to-cart" id="btn-carrinho" onclick="">adicionar ao carrinho</button>
    </div>
  </div>   
    `;
    list.appendChild(li);
  });
})
.catch(function(error) {
  console.log(error);
});