import express from "express";
import cors from 'cors';
import userController from "./controllers/userController.js";
import { Autheticated } from "./middleware/autheticated.js";
import config from './config/dbEnv.js';

const PORT = config.port;
const app = express();

//Configurações Básicas
app.use(express.json());
app.use(cors());

//Rotas Públicas
app.get('/', (req, res) =>{
    res.send(200).json({"Msg": 'For while is working!'});
});

app.get('/all', userController.showAll);

app.post('/newUser', userController.create);

app.post('/user/login', userController.login);
//Middleware
app.use(Autheticated);

//Rotas Privadas

app.post('/data', userController.findUser);

//Inicialização do servidor
app.listen(PORT || 5000,() => {
    console.log(`Sever is running on the port ${PORT}`);
})