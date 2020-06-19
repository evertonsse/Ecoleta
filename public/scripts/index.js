const buttonSearch = document.querySelector("#page-home main a"); //Seleciona a tag <a> referente ao botão
const modal = document.querySelector("#modal"); // Seleciona a div chamada  #modal
const CLOSE = document.querySelector("#modal #content a");

buttonSearch.addEventListener("click", () => {
  //adciona um eventListener à ação de click do <a>
  modal.classList.remove("hide"); // remove a classe "hide" na div modal
});

CLOSE.addEventListener("click", () => {
  //adciona um eventListener à ação de click do <a>
  event.preventDefault(); //remove o comportamento padrão de relogar a página ao rodar um evento

  modal.classList.add("hide"); // Adciona a classe "hide" na div modal
});
