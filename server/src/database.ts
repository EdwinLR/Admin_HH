import sql from 'mssql';

const dbSettings=
{
   user:'localhost',
   password:'12345',
   server:'localhost',
   database:'BD_SistemaEscolar',
   options: {
   encrypt: true, 
   
   trustServerCertificate: true
 }
};


const pool= sql.connect(dbSettings)

export default pool;