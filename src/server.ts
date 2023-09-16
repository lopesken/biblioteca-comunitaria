import express from 'express';
import dotenv from 'dotenv';
import clientRoute from './Routers/clientRoute';
import userRoute from './Routers/userRoute';

dotenv.config();

const app = express();
const port = process.env.PORT
app.use(express.json());

app.use('/', userRoute);
app.use('/', clientRoute);


app.listen(port);

