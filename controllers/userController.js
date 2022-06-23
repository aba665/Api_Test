import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

class UserController{
    
    async showAll(req, res){
        try {
            let data = await User.find({});
            res.json(data);            
        } catch (error) {
            console.log(error);
        }
    }

    async findUser(req, res){
        let email = await req.body.email
        console.log(email)
        try {
            let data = await User.findOne({email});

            res.json({nickname: data.nickname});            
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res){
        let { email, password, name, nickname, age } = await req.body

        if(!email || !password || !name || !age){
            return res.sendStatus(401).send("Os dados precisa serem passados!");

        }
        
        let salt = bcrypt.genSaltSync(14);
        console.log('salt = ' + salt)
        try {
            
            let user = new User(
                {
                    email,
                    password: bcrypt.hashSync(password, salt),
                    name,
                    nickname,
                    age
                }
            )
            console.log(user)
            await user.save().then(doc => {
                return console.log(doc);
            }).catch(error => {
                console.log(error);
            });

            let redirection = true; 
            return res.json({redirection});
            
        } catch (error) {
            res.sendStatus(error.message);
        }
            
        }

    async login(req, res){
        let { email, password, token } =  await req.body;
        
        let selectedUser = await User.findOne({email});
        const id = JSON.stringify(selectedUser._id);
        const nickname = JSON.stringify(selectedUser.nickname)
        if(!selectedUser){
            return res.sendStatus(404).json('Email or Password incorrect');
        }

        let userVerification = bcrypt.compareSync(password, selectedUser.password);
        
        if(!userVerification){
            return res.sendStatus(404);
        }

        let userVerificated = true;

        if(userVerification){
            
                return res.json({
                 user: { id, email, nickname },
                 token: jwt.sign( { id }, authConfig.secret, {expiresIn: authConfig.expiresIn}),
                 userVerificated: userVerificated
             })
        }
    }

    async deleteUser(req, res){
        
    }
    
}

export default new UserController;