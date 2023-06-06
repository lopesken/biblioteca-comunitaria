import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { poolQuery } from '../Connections/conexao';


const cadastrarUsuario = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body

    try {
        const criptografia = await bcrypt.hash(senha, 10)
        const insert = `insert into usuarios (nome,email,senha) values ($1,$2,$3) returning (nome,email)`
        await poolQuery(insert, [nome, email, criptografia])
        return res.status(201).json({ Mensagem: "Usuario cadastrado com sucesso" })
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
}
const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body
    try {
        const selectEmail = "select * from usuarios where email=$1"
        const resultado = await poolQuery(selectEmail, [email])
        let usuario = resultado.rows[0]
        const token = jwt.sign({ email }, process.env.SENHAJWT as string)
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (resultado.rowCount == 0) {
            return res.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        if (senha !== usuario.senha && !senhaCorreta) {
            return res.status(401).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }

        return res.status(200).json({ mensagem: `Bem-Vindo!`, token });

    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
}

export { cadastrarUsuario, login }