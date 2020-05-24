var user = document.querySelector("#gitname");
var lista = document.createElement("ul");
var app = document.querySelector("#app");
var title = document.querySelector("h1");
app.appendChild(lista);

function adicionar() {
  //  Mensagem falando de que usuário são os repositórios
  title.style.color = "white";
  title.innerHTML = `Repositórios de ${user.value}`;


  // lista.innerHTML = "" Linha para limpar a lista de repositórios assim que o botão de checar for clicado
  lista.innerHTML = "";


  // Aparecer mensagem de Carregamento enquanto a requisição é feita
  var item = document.createElement("li");
  var itemText = document.createTextNode("Carregando...");
  item.appendChild(itemText);
  lista.appendChild(item);


  // axios.get() para fazer a requisição dos repositórios de algum usuário
  axios.get(`https://api.github.com/users/${user.value}/repos`)


    // Caso a requisição de certo o a function(response) do .then é executada
    .then(function (response) {
      // Mostra no console as informações requisitadas pelo axios.get
      console.log(response);
      // responde.data para acessar o array data onde está localizado os repositórios
      var repo = response.data;
      // Mostrar o array dos repositórios no console
      console.log(repo);


      // Função para exibir a lista com o nome dos repositórios
      function exibirDados() {
        // Limpar a lista antes de exibir os novos dados
        lista.innerHTML = "";
        // Uso do "for of" para acessar os objetos dentro do array data que foi definido como repo
        for (var value of repo) {
          // Criar um link para cada repositório
          var linkElement = document.createElement("a");
          lista.appendChild(linkElement);
          linkElement.setAttribute("href", `https://github.com/${value.full_name}`);
          linkElement.setAttribute("target", "_blank");
          // Criar list items com o nome dos repositórios
          var item = document.createElement("li");
          linkElement.appendChild(item);
          var itemText = document.createTextNode(value.name);
          item.appendChild(itemText);
        }
      }
      exibirDados();
    })


    // Caso a requisição de errado o .catch será executado
    .catch(function (error) {
      // Mensagem de erro inserida num h1 na cor vermelha
      title.style.color = "#ff5252";
      title.innerHTML = "Você não inseriu nenhum username<br> Ou este usuário não existe";
      item.removeChild(itemText);
    });
  // Limpar o input e focar a digitação assim que o a função adicionar for executada
  user.value = "";
  user.focus();
}