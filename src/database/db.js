// Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

//Iniciar ao objeto de banco de dados passando os caminho onde o arquivo de bando de dados deve ser criado
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//Utiliza o objeto de banco de dados para as querys
//O método serialize recebe uma função como parametro executando uma serie de comandos em sql
// db.serialize(() => {
//   //O método run recebe una string com o comando sql a ser executado
//   //Criação da tabela
//   db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `);

//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items )
//       VALUES (?,?,?,?,?,?,?)
//       `;

//   const values = [
//     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "N° 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis, Papelão",
//   ];

//   function afterInsertData(err) {
//     //Recebe o erro por parametro
//     if (err) {
//       //Verifica se a variável de erro contem algo
//       return console.log(err);
//     }
//     console.log("Cadastrado com sucesso...");
//     console.log(this);
//   }

//   /*  Caso haja valores a serem recebidos pela query,
//   o metodo run() recebe outro parametro com esses valores
//   Neste caso um função de callback tbm é recebida por parametro
//   para tratar as exceções da query
//    */
//   db.run(query, values, afterInsertData);

  /*  o método all() recebe 2 parametros uma instrução sql e uma função de callback
  a função de callback tbm recebe 2 parametros o erro e um array com o resultado da query */
  //Usada para instruções sqls q retornem registros ex.: select, join, etc
//   db.all("SELECT * FROM places", function (err, rows) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("Aqui estão seu registros");
//     console.log(rows);
//   });

//   // //No caso de delete tbm utilizamos também a run()
//   db.run("DELETE FROM PLACES WHERE id = ?", [], function (err) {
//     if (err) {
//       return console.log(err);

//     }
//     console.log ("Registro deletado com sucesso")
//   });

// });
