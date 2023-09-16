import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { poolQuery } from '../Connections/poolquery';

const cadastrarLeitor = async (req: Request, res: Response) => {
    const { nome, email } = req.body

    try {
        // const criptografia = await bcrypt.hash(senha, 10)
        const insert = `insert into clientes (nome,email) values ($1,$2) returning (nome,email)`
        await poolQuery(insert, [nome, email])
        return res.status(201).json({ Mensagem: "Cliente cadastrado com sucesso" })
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
}
// const loginLeitor = async (req: Request, res: Response) => {
//     const { email, senha } = req.body
//     try {
//         const selectEmail = "select * from clientes where email=$1"
//         const resultado = await poolQuery(selectEmail, [email])
//         let usuario = resultado.rows[0]
//         const token = jwt.sign({ email }, process.env.SENHAJWT as string)
//         const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

//         if (resultado.rowCount == 0) {
//             return res.status(401).json({
//                 mensagem: "Login e/ou senha inválido(s)."
//             })
//         }

//         if (senha !== usuario.senha && !senhaCorreta) {
//             return res.status(401).json({
//                 mensagem: "Login e/ou senha inválido(s)."
//             })
//         }

//         return res.status(200).json({ mensagem: `Bem-Vindo!`, token });

//     } catch (error: any) {
//         return res.status(500).json({ mensagem: error.message });
//     }
// }
const excluirLeitor = async (req: Request, res: Response) => {
    const { nome, email } = req.query

    try {
        // const criptografia = await bcrypt.hash(senha, 10)
        const deletar = `delete from clientes where email=$1`
        const resultado = await poolQuery(deletar, [email])

        if (resultado.rowCount === 0) {
            return res.json('Cliente não encontrado');
        }
        return res.status(202).json({ Mensagem: "Cliente deletado com sucesso" })
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
}
const listarClientes = async (req: Request, res: Response): Promise<Response> => {

    try {
        const select = 'select * from clientes';
        const resultado = await poolQuery(select);
        if (resultado.rowCount == 0) {
            return res.status(400).json({ mensagem: `Não há cliente cadastrado nessa biblioteca` })
        }
        return res.json(resultado.rows);
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
};
const retirada = async (req: Request, res: Response) => {
    const { titulo, autor, email } = req.query;

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
    }
    try {
        const select = 'select * from livros where titulo = $1 and autor = $2';
        const resultado = await poolQuery(select, [titulo, autor]);

        if (resultado.rowCount === 0) {
            return res.json('Não há livro cadastrado nessa categoria');
        }
        const insert = `insert into emprestimos (titulo, autor, email) values($1,$2,$3)`
        await poolQuery(insert, [titulo, autor, email])

        return res.status(200).json({ mensagem: `Livro reservado com sucesso` })
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
}
const devolucao = async (req: Request, res: Response) => {
    const { titulo, autor, email } = req.query;

    try {
        const deletar = 'delete from emprestimos where titulo = $1 and autor = $2 and email = $3';
        const resultado = await poolQuery(deletar, [titulo, autor, email]);

        if (resultado.rowCount === 0) {
            return res.json('Lembre-se, os dados titulo, autor e email do cliente são obrigatórios');
        }
        return res.status(200).json({ mensagem: `Livro devolvido com sucesso` })
    } catch (error: any) {
        return res.status(500).json({ mensagem: error.message });
    }
}
export {
    cadastrarLeitor,
    //  loginLeitor,
    excluirLeitor,
    listarClientes,
    retirada,
    devolucao
}