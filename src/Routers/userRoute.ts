import { Router } from 'express';
import { listarTodos, cadastrarLivro, filtro, deletarLivro } from '../Controllers/bookshelf';
import { email, validarDados } from '../Middlewares/validator';
import { cadastrarUsuario, login } from '../Controllers/user';
import validarToken from '../Middlewares/token';

const rotas = Router();

rotas.post('/usuario', email, cadastrarUsuario);
rotas.get('/usuario', login);
rotas.use(validarToken)
rotas.get('/listar', listarTodos);
rotas.get('/listafiltrada', filtro);
rotas.post('/cadastrar', validarDados, cadastrarLivro);
rotas.delete('/deletar', deletarLivro);

export default rotas;
