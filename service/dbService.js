import Mongo from "mongoose";

import config from '../config/dbEnv.js';

Mongo.connect(config.url);

let db = Mongo.connection;

db.on("error", () => {
    console.log('Houve um erro!');
});

db.once("open", () => {
    console.log('banco de dados carregado!');
});

export default Mongo;