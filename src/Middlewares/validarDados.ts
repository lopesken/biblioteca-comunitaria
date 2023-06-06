import { Request, Response, NextFunction } from 'express';
import { poolQuery } from '../Connections/conexao';

const validarDados = async (req: Request, res: Response, next: NextFunction) => {
    const { titulo, autor } = req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: 'O campo título é obrigatório' });
    }
    if (!autor) {
        return res.status(400).json({ mensagem: 'O campo autor é obrigatório' });
    }
    next();
};
const email = async (req: Request, res: Response, next: NextFunction) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'O campo email e senha são obrigatório' });
    }
    const select = `select * from usuarios where email=$1`
    const resultado = await poolQuery(select, [email])
    console.log(resultado.rows);

    if (resultado.rowCount !== 0) {
        return res.status(400).json({ mensagem: 'Email já cadastrado no sistema' });
    }

    next();
}
const emailCliente = async (req: Request, res: Response, next: NextFunction) => {
    const { email, senha } = req.body

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório' });
    }
    const select = `select * from clientes where email=$1`
    const resultado = await poolQuery(select, [email])

    if (resultado.rowCount !== 0) {
        return res.status(400).json({ mensagem: 'Email já cadastrado no sistema' });
    }

    next();
}
export { validarDados, email, emailCliente }

