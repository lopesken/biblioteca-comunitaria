import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { poolQuery } from '../Connections/poolquery';

const validarToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }
    const token = authorization.split(' ')[1];

    try {
        const { email } = jwt.verify(token, process.env.SENHAJWT as string) as { email: any };

        const select = `SELECT * FROM usuarios WHERE email = $1`;
        const { rowCount } = await poolQuery(select, [email]);

        if (!rowCount) {
            return res.status(401).json({ mensagem: "Usuario não autenticado" });
        }
        next();

    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};


export default validarToken;
