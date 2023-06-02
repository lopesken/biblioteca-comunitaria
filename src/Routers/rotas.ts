import { Router } from 'express';
import { listarTodos, cadastrarLivro, filtro, deletarLivro } from '../Controllers/estante';
import validarDados from '../validarDados';
import { cadastrarUsuario, login } from '../Controllers/usuario';

const rotas = Router();

rotas.post('/usuario', cadastrarUsuario)
rotas.get('/usuario', login)
rotas.get('/listar', listarTodos);
rotas.get('/listafiltrada', filtro);
rotas.post('/cadastrar', validarDados, cadastrarLivro);
rotas.delete('/deletar', deletarLivro);

export default rotas;
