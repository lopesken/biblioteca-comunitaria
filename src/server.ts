import express from 'express';
import dotenv from 'dotenv';
import rotasClientes from './Routers/rotasCliente';
import rotasUsuarios from './Routers/rotasUsuarios';

dotenv.config();

const app = express();
const port = process.env.PORT
app.use(express.json());

app.use('/', rotasUsuarios);
app.use('/', rotasClientes);


app.listen(port);

