
function autorizacao(){
    var login = document.getElementById('user').value
    var senha = document.getElementById('senha').value

    console.log(login)
    console.log(senha)
   
        if(login == 'jonatan777' && senha == 687251){
            sessionStorage.setItem("login", login);
            window.location = "/html/entrar.html"
        }else {
          document.getElementById("result").innerHTML = `<h3>Você não tem autorização!</h3>`
        }
}


