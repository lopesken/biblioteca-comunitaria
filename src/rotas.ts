import { Router } from 'express';
import { listarTodos, cadastrarLivro, filtro, deletarLivro, boasvindas } from './controladores';
import validarDados from './validarDados';

const rotas = Router();

rotas.get('/', boasvindas);
rotas.get('/listar', listarTodos);
rotas.get('/listafiltrada', filtro);
rotas.post('/cadastrar', validarDados, cadastrarLivro);
rotas.delete('/deletar', deletarLivro);

export default rotas;
