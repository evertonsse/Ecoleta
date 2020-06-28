const express = require("express");
const server = express();
const db = require("./database/db.js"); //Pegar o banco de dados

//configurar pasta publica
// permite ao servidor enxergar os arquivos que a página utiliza ex: (css, assets... )
server.use(express.static("public"));

//Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

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
  return res.render("index.html");
});

/* metodo get recebe 2 argumentos, o primeiro o nome da rota que estou criando
e o segundo a requisição e a resposta*/
server.get("/create-point", (req, res) => {
  // os dados do meu formulário são enviados pela rota através da requisição no req.query
  //query strings
  console.log(req.query);
  return res.render("create-point.html");
});

//Metodo http do tipo post
server.post("/save-point", (req, res) => {
  //Por padrão é o req.body é desabilitado no express, habilitação ocorre na linha 10
  const query = `
       INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items )
        VALUES (?,?,?,?,?,?,?)
        `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    //Recebe o erro por parametro
    if (err) {
      //Verifica se a variável de erro contem algo
      console.log(err);
      return res.send("Erro ao cadastrar");
    }
    console.log("Cadastrado com sucesso...");
    console.log(this);

    return res.render("create-point.html", { saved: true });
  }

  /*  Caso haja valores a serem recebidos pela query,
    o metodo run() recebe outro parametro com esses valores
    Neste caso um função de callback tbm é recebida por parametro
    para tratar as exceções da query
     */
  db.run(query, values, afterInsertData);
});




server.get("/search", (req, res) => {
  const search = req.query.search;

  if (search == "") {
    // pesquisa vazia
    return res.render("search-results.html"); 
  }
  //Pegar dados no banco
  db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    return res.render("search-results.html", { places: rows }); // retorno o contéudo do select que estava em rows junto a renderização da página
  });
});

// Ligar o servidor, o argumento da função é a porta que o servidor ficará ouvindo, no node geralmente usa-se a porta 3000
server.listen(3000);
