const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'biblioteca_pessoal',
})

const poolQuery = (texto, parametro) => {
    return pool.query(texto, parametro);
}


module.exports = {
    poolQuery,
    pool
}