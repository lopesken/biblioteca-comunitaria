const { Router } = require('express');
const rotas = Router()
const { listarTodos, cadastrarLivro, filtro, deletarLivro, boasvindas } = require('../src/controladores');
const validarDados = require('../src/validarDados');

rotas.get('/', boasvindas)
rotas.get('/listar', listarTodos)
rotas.get('/listafiltrada', filtro)
rotas.post('/cadastrar', validarDados, cadastrarLivro)
rotas.delete('/deletar', deletarLivro)

module.exports = rotas