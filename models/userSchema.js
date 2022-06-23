import Mongo from '../service/dbService.js';

const schema =  new Mongo.Schema(
    {
       email: {type: String, unique: true, required: true},
       password: {type: String, required: true},
       name: {type: String, required: true},
       nickname: String,
       age: {type: Number, required: true}
    }
)

const User = Mongo.model('User', schema);

export default User;