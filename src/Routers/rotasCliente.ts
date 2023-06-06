import { Router } from 'express';
import { emailCliente } from '../Middlewares/validarDados';
import {
    cadastrarLeitor,
    devolucao,
    excluirLeitor,
    // loginLeitor, 
    retirada
} from '../Controllers/cliente';
const rotas = Router();

rotas.post('/cliente', emailCliente, cadastrarLeitor)
// rotas.get('/cliente', loginLeitor)
rotas.delete('/cliente', excluirLeitor)
rotas.post('/retirada', retirada)
rotas.delete('/devolucao', devolucao)

export default rotas