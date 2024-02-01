
document.addEventListener('DOMContentLoaded', function () {
  const productsContainer = document.getElementById('products');
  const cartItemsContainer = document.querySelector('#cart-items tbody');
  const cartTotal = document.querySelector('#cart-total');

  let cart = [];

  function addToCart(name, price, qtd) {
    const valor = price * qtd;
    const item = { name, price, qtd, valor };
    cart.push(item);
    displayCartItems();
  }
  // Função para obter os produtos da API -------------------
  function getProducts() {
    fetch('http://181.215.135.83:8176/produto/all')
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error('Erro ao obter produtos:', error));
  }

  function salgados() {
    fetch('http://181.215.135.83:8176/produto/allSalgados')
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error('Erro ao obter salgados:', error));
  }

  function doces() {
    fetch('http://181.215.135.83:8176/produto/allDoces')
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error('Erro ao obter Doçes:', error));
  }

  function sanduiches() {
    fetch('http://181.215.135.83:8176/produto/allSanduiches')
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error('Erro ao obter Hamburgueres:', error));
  }

  function hamburgueres() {
    fetch('http://181.215.135.83:8176/produto/allHamburgeres')
      .then(response => response.json())
      .then(products => displayProducts(products))
      console.log(products)
      .catch(error => console.error('Erro ao obter sanduiches:', error));
  }

  // FIM da Função para obter os produtos da API -------------------

  // Função para exibir os produtos na página
  function displayProducts(products) {
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.dataset.name = product.nome;
      productElement.dataset.price = product.preco;
      productElement.id = 'card';
      productElement.innerHTML = `
            <h3>${product.descricao}</h3>
            <p>${product.quantidade}</p>
            <br>
            <p>R$ ${product.preco}</p>
            <img src = ${product.imagem}></img>
            <br>
            <br>
            <button class="add-to-cart w3-button" id="btn-carrinho" onclick="">Adicionar ao Carrinho</button>
          `;

      productsContainer.appendChild(productElement);
    });
    // Adicionar event listeners após exibir os produtos
    addEventListeners();
  }
  // Função para adicionar event listeners aos botões "Adicionar ao Carrinho"
  function addEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const product = button.parentNode;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);

        const qtd = prompt('Quantas Unidades ?');
        if (qtd != null && qtd != "" && qtd != 0) {
          addToCart(productName, productPrice, qtd);
          updateCartTotal();
        } else {
          displayCartItems();
        }
      });
    });
  }

  function displayCartItems() {
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
            <td>${item.name}</td>
            <td>R$ ${item.price}</td>
            <td> ${item.qtd}</td>
            <td>R$ ${item.valor}</td>
            <td class="remove-item" data-name="${item.name}">Remover</td>
          `;
      cartItemsContainer.appendChild(row);
    });

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const itemName = button.dataset.name;
        console.log(itemName)
        removeCartItem(itemName);
        updateCartTotal();
      });
    });
  }

  function removeCartItem(name) {
    cart = cart.filter(item => item.name !== name);
    displayCartItems();
  }

  function updateCartTotal() {
    const total = cart.reduce((acc, item) => acc + item.valor, 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    // document.getElementById('total').innerHTML = total;
  }
  document.getElementById('btn-finalizar').addEventListener("click", function () {
    sessionStorage.setItem('produtos', JSON.stringify(cart));
    window.location.href = "./html/payment.html";
  }
  );
  // essas são funçoẽs de click da pagina index para obter os produtos da API
  document.getElementById("salgados").addEventListener('click', function () {
    if (productsContainer.innerHTML == '') {
      salgados();
    } else if (productsContainer.innerHTML != '') {
      productsContainer.innerHTML = ''
      salgados();
    }
  });
  document.getElementById("doces").addEventListener('click', function () {
    if (productsContainer.innerHTML == '') {
      doces();
    } else if (productsContainer.innerHTML != '') {
      productsContainer.innerHTML = ''
      doces();
    }
  });
  document.getElementById("sanduiches").addEventListener('click', function () {
    if (productsContainer.innerHTML == '') {
      sanduiches();
    } else if (productsContainer.innerHTML != '') {
      productsContainer.innerHTML = ''
      sanduiches();
    }
  });
  document.getElementById("hamburgueres").addEventListener('click', function () {
    if (productsContainer.innerHTML == '') {
      hamburgueres();
    } else if (productsContainer.innerHTML != '') {
      productsContainer.innerHTML = ''
      hamburgueres();
    }
  });

  getProducts()
});