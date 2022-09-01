const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'NAna-0218',
    database: 'test',
    multipleStatements: true
})
connection.connect()
connection.query('select 1 + 1', (err, rows) => { /* */ });
const query = function (sql) {
  return new Promise((resolve, reject) => {
      connection.query(sql,  function (error, results) {
          if(error){
              reject(error);
          }else{
              resolve(results)
          }
      });
  })
}
async function getAll() {
    return await query("SELECT * FROM user");
  }



module.exports = {
    getAll
  };