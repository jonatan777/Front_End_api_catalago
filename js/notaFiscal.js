        // Verifica se a sessionStorage possui o array
        if (sessionStorage.getItem('produtos')) {
            // Obtém o array da sessionStorage e converte de volta para um array JavaScript
            var arrayDaSessionStorage = JSON.parse(sessionStorage.getItem('produtos'));
            var total = JSON.parse(sessionStorage.getItem('total2'));

            
            totalPagar();
            // Obtém a referência da lista HTML
            var lista = document.getElementById('lista');

            // Itera sobre o array e adiciona itens à lista
            arrayDaSessionStorage.forEach(function(item) {
                var li = document.createElement('li');

                var p = document.createElement('p');
                var p1 = document.createElement('p');
                var p2 = document.createElement('p');
                var p3 = document.createElement('p');
                  
                    p.textContent = item.name;
                    p1.textContent = "preço: "+item.price;
                    p2.textContent = "qtd: "+item.qtd;
                    p3.textContent = item.valor;
                   
                    p.className = "nome";
                    p1.className = "preco";
                    p2.className = "qtd";
                    p3.className = "valor";
                    
                lista.appendChild(p);
                lista.appendChild(p1);
                lista.appendChild(p2);
                lista.appendChild(p3);
               
                lista.appendChild(li);
            });
        } else {
            console.log('Array não encontrado na sessionStorage.');
        }
 
        function totalPagar() {
          const total = arrayDaSessionStorage.reduce((acc, item) => acc + item.valor, 0);
         // cartTotal.textContent = `R$ ${total.toFixed(2)}`;
           document.getElementById('total2').innerHTML = total.toFixed(2);
        }