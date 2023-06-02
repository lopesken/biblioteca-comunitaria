import express from 'express';
import rotas from './src/rotas';

const app = express();

app.use(express.json());

app.use('/', rotas);

app.listen(3000);
