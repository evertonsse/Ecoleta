const express = require("express");
const server = express();
const db = require("./database/db.js") //Pegar o banco de dados

//configurar pasta publica
// permite ao servidor enxergar os arquivos que a página utiliza ex: (css, assets... )
server.use(express.static("public"));

//Utilizando template engine (npm install nunjucks)
const nunjucks = require("nunjucks");
/* recebe 2 argumentos, o primeiro o direitorio com arquivos 
e o segundo um objeto de configuração */
nunjucks.configure("src/views", {
  express: server, //indica a variável do servidor express
  noCache: true, //desabilita o cache
});

// Configurar caminhos para aplicação
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
  /* o metodo render recebe dois argumentos, o primeiro o arquivo a ser renderizado na página
    e o segundo um objeto que é utilizado pelo nunjucks para enviar dados para o html */
  return res.render("index.html", { title: "Dale" });
});

/* metodo get recebe 2 argumentos, o primeiro o nome da rota que estou criando
e o segundo a requisição e a resposta*/
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});


server.get("/search", (req, res) => {

  //Pegar dados no banco
  db.all("SELECT * FROM places", function (err, rows) {
        if (err) {
          return console.log(err);
        }
        return res.render("search-results.html", {places: rows}); // retorno o contéudo do select que estava em rows junto a renderização da página
      });

    
  });
// Ligar o servidor, o argumento da função é a porta que o servidor ficará ouvindo, no node geralmente usa-se a porta 3000
server.listen(3000);
