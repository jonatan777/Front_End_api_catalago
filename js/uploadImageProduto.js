
function validarArquivo(){
    var arquivoInput = document.getElementById('arquivo');
    previaDaImagem = document.querySelector('.imagem');
    var caminhoArquivo = arquivoInput.value;
    var extensoesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!extensoesPermitidas.exec(caminhoArquivo)){
        alert('Por favor envie um arquivo que tenha as extensões.jpeg/.jpg/.png/.gif .');
        arquivoInput.value = '';
        return false;
    }else{
        if (arquivoInput.files && arquivoInput.files[0]) {
            //console.log(arquivoInput.files[0].name);
            var reader = new FileReader();
            reader.onload = function(e) {    
              document.getElementById('visualizarImagem').innerHTML = '<img class="imagem" src='+e.target.result+' alt="Sua imagem" width="350" height="150">';
              document.getElementById('visualizarUrl').innerHTML =  '<p>http://181.215.135.83:8176/get/image/'+arquivoInput.files[0].name+'</p>'
           //   var resultado = document.getElementById('form');
            //  console.log(resultado.su)
            };
               reader.readAsDataURL(arquivoInput.files[0]);
            //   console.log(arquivoInput.files[0].size / 1024 / 1024);
            //   console.log(arquivoInput.files[0].size);
                if (arquivoInput.files[0].size > 2097152) { 
                     alert("Tamanho do arquivo deve ser 2 MB!");
                     return false;
                }
        }
    }
}
      
function salvarImagem(){
    var arquivoInput = document.getElementById('arquivo');
    previaDaImagem = document.querySelector('.imagem');
    var caminhoArquivo = arquivoInput.value;
    const url = 'http://181.215.135.83:8176/upload/image'
  
    const formData = new FormData();
    formData.append('image', arquivoInput.files[0]);   
    axios.post(url,  formData, 
        { headers: {'Content-Type': 'multipart/form-data',}},
      )
    .then(response => {
    // console.log(response.data.message);
     document.getElementById('visualizarRespostaServidor').innerHTML =  '<h3>'+response.data.message+'</h3>'
     location.reload();
    })
    .catch(error => {
     console.log(error);
     document.getElementById('visualizarRespostaServidor').innerHTML =  '<h3>'+error+'</h3>'
    });
}

const url = 'http://181.215.135.83:8176/get/image/all';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {

  let imagens = data;
  var indice = 1;
  let list = document.getElementById("listUrlImage");

  imagens.forEach((imagem) => {
    let li = document.createElement("li");
    li.innerHTML = `<p>${indice ++}  &nbsp;&nbsp;&nbsp; ${imagem.name}</p> <button class="w3-button w3-black" id="imageDelete" onclick="deleteImage(${imagem.id})">DELETAR</button>`;
    list.appendChild(li);
  });
})
.catch(function(error) {
  console.log(error);
});

function deleteImage(id){
//  const url = `http://181.215.135.83:8176/image/delete/${id}`
  var re = confirm("Excluir Imagem?");
  if(re == false){
  location.reload();
  }else if(re == true){
   
    fetch('http://181.215.135.83:8176/image/delete/' + id, {
      method: 'DELETE',
    })
    .then(res => document.getElementById('root').innerHTML =  `
    <h1 class="w3-blue">excluído com sucesso! ${res}<h1><br>
    <button class="w3-margin" onclick="redirect3()">recarregar pagina</button>`  ) // or res.json()
    .then(res => console.log(res))
    }  
  }

function redirect1(){
  window.location.href = "http://127.0.0.1:5500/html/entrar.html";
}
function redirect2(){
  window.location.href = "http://127.0.0.1:5500/html/addProduto.html";
}
function redirect3(){
  window.location.reload();
}