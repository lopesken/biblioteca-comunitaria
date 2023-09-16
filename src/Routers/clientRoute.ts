import { Router } from 'express';
import { emailCliente } from '../Middlewares/validator';
import {
    cadastrarLeitor,
    devolucao,
    excluirLeitor,
    listarClientes,
    // loginLeitor, 
    retirada
} from '../Controllers/client';
const rotas = Router();

rotas.post('/cliente', emailCliente, cadastrarLeitor)
// rotas.get('/cliente', loginLeitor)
rotas.delete('/cliente', excluirLeitor)
rotas.get('/cliente', listarClientes)
rotas.post('/retirada', retirada)
rotas.delete('/devolucao', devolucao)

export default rotas