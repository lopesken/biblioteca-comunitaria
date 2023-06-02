import { Request, Response } from 'express';
import { poolQuery } from './conexao';

const boasvindas = (req: Request, res: Response): Response => {
    return res.send('Welcome to your library!');
};

const listarTodos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const select = 'select * from livros';
        const resultado = await poolQuery(select);
        return res.json(resultado.rows);
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const filtro = async (req: Request, res: Response): Promise<Response> => {
    const { titulo, autor, genero, tipo, paginas } = req.query;

    try {
        const select = 'select * from livros where titulo = $1 or autor = $2 or genero = $3 or tipo=$4 or paginas = $5';
        const resultado = await poolQuery(select, [titulo, autor, genero, tipo, paginas]);

        if (resultado.rowCount === 0) {
            return res.json('Não há livro cadastrado nessa categoria');
        }

        return res.json(resultado.rows);
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const cadastrarLivro = async (req: Request, res: Response): Promise<Response> => {
    const { titulo, autor, genero, tipo, paginas } = req.body;

    try {
        if (!paginas) {
            const insert = 'insert into livros (titulo, autor, genero, tipo) values ($1,$2,$3,$4)';
            const resultado = await poolQuery(insert, [titulo, autor, genero, tipo]);
            return res.status(200).json({ mensagem: 'livro cadastrado' });
        }

        const insert = 'insert into livros (titulo, autor, genero, tipo, paginas) values ($1,$2,$3,$4,$5)';
        const resultado = await poolQuery(insert, [titulo, autor, genero, tipo, paginas]);
        return res.status(200).json({ mensagem: 'livro cadastrado' });
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const deletarLivro = async (req: Request, res: Response): Promise<Response> => {
    const { titulo, autor, genero, tipo, paginas } = req.query;

    try {
        const deletar = 'delete from livros where titulo = $1 or autor = $2 or genero = $3 or tipo=$4 or paginas = $5';
        const resultado = await poolQuery(deletar, [titulo, autor, genero, tipo, paginas]);

        if (resultado.rowCount === 0) {
            return res.json('Não há livro cadastrado nessa categoria');
        }

        return res.status(204).send();
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};

export {
    boasvindas,
    listarTodos,
    filtro,
    cadastrarLivro,
    deletarLivro,
};
