import { Pool, QueryResult } from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'biblioteca_pessoal',
});

const poolQuery = (texto: string, parametro?: any[]): Promise<QueryResult> => {
    return pool.query(texto, parametro);
};

export { poolQuery };
