import { Request, Response } from 'express';
import { poolQuery } from '../Connections/poolquery';

const listarTodos = async (req: Request, res: Response): Promise<Response> => {

    try {
        const select = 'select * from livros';
        const resultado = await poolQuery(select);
        if (resultado.rowCount == 0) {
            return res.status(400).json({ mensagem: `Não há livro cadastrado nessa biblioteca` })
        }
        return res.json(resultado.rows);
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};
const filtro = async (req: Request, res: Response): Promise<Response> => {
    const { titulo, autor } = req.query;

    try {
        const select = 'select * from livros where titulo = $1 or autor = $2';
        const resultado = await poolQuery(select, [titulo, autor]);

        if (resultado.rowCount === 0) {
            return res.json('Não há livro cadastrado nessa categoria');
        }

        return res.json(resultado.rows);
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};
const cadastrarLivro = async (req: Request, res: Response): Promise<Response> => {
    const { titulo, autor, genero } = req.body
    try {
        const insert = 'INSERT INTO livros (titulo, autor,genero) VALUES ($1, $2, $3) RETURNING *';
        const resultado = await poolQuery(insert, [titulo, autor, genero]);
        const livroInserido = resultado.rows[0];

        return res.status(201).json({
            mensagem: 'Livro cadastrado com sucesso.',
            livro: livroInserido
        });
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};
const deletarLivro = async (req: Request, res: Response): Promise<Response> => {
    const { titulo, autor } = req.query;

    try {
        const deletar = 'delete from livros where titulo = $1 and autor = $2';
        const resultado = await poolQuery(deletar, [titulo, autor]);

        if (resultado.rowCount === 0) {
            return res.json('Não há livro cadastrado nessa categoria');
        }

        return res.status(202).send();
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};

export {
    listarTodos,
    filtro,
    cadastrarLivro,
    deletarLivro,
};
