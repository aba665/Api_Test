import express from "express";
import cors from 'cors';
import userController from "./controllers/userController.js";
import { Autheticated } from "./middleware/autheticated.js";

const app = express();

//Configurações Básicas
app.use(express.json());
app.use(cors());

//Rotas Públicas
app.get('/', (req, res) =>{
    res.status(200).json({"Msg": 'For while is working!'});
});

app.get('/all', userController.showAll);

app.post('/newUser', userController.create);

app.post('/user/login', userController.login);

//Rotas Privadas

app.post('/movies/favorite/show', Autheticated, userController.findFavoriteMovie);
app.post('/data', Autheticated, userController.findUser);
app.put('/movies/favorite', Autheticated, userController.likeMovie);


//Inicialização do servidor
app.listen(process.env.PORT || 5000);