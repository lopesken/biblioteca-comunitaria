import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken'
// import { poolQuery } from './conexao';

const validarDados = async (req: Request, res: Response, next: NextFunction) => {
    const { titulo, autor, paginas, genero, tipo } = req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: 'O campo título é obrigatório' });
    }
    if (!autor) {
        return res.status(400).json({ mensagem: 'O campo autor é obrigatório' });
    }
    if (!genero) {
        return res.status(400).json({ mensagem: 'O campo genero é obrigatório' });
    }
    if (!tipo) {
        return res.status(400).json({ mensagem: 'O campo tipo é obrigatório' });
    }
    next();
};


export default validarDados

