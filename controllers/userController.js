import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';
import dataMovie from "../models/movieSchema.js";

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
            return res.status(401).json({Message: "Os dados precisa serem passados!"});

        }
        
        let salt = bcrypt.genSaltSync(14);
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
            
            await user.save().then(doc => {
                return res.status(201);
            }).catch(error => {
                console.log(error);
            });

            let redirection = true; 
            return res.json({redirection});
            
        } catch (error) {
            res.status(error.message);
        }
            
        }

    async login(req, res){
        let { email, password, token } =  await req.body;
        let selectedUser = await User.findOne({email});
        
        if(!selectedUser || selectedUser === null){
            return res.status(404).json(null);
        }
        
        const id = JSON.stringify(selectedUser._id);
        const nickname = JSON.stringify(selectedUser.nickname)
        
        let userVerification = bcrypt.compareSync(password, selectedUser.password);
        
        if(!userVerification){
            return res.status(404).json(null);
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

    async likeMovie(req, res){
    try {
        let { email, name, description, urlImg  } = await req.body;
        let movie = {
            name,
            description,
            urlImg
        }
        
        let dataUser = await dataMovie.findOne({ email });

        if(dataUser != null){
            const arrayMovie = dataUser.movie; 
  
        let testMovie = false;

        arrayMovie.map(doc => {
            if(doc.name == name || doc.description == description || doc.urlImg == urlImg){
                return  testMovie = true;
            }
        });
        
        let result = null
        if(testMovie == true){
            return res.status(400).json({ resultado: result });
        }
        
        
        if(testMovie == false){
            if(dataUser && dataUser != null && testMovie != true){
                await dataMovie.updateOne({ email }, {$push: { movie }})
                return res.status(201).json({message: 'Usuário atualizado com sucesso'});
            }
    }
    }

    if(dataUser == null){
            let data = new dataMovie(
            {
                email,
                movie: [{
                name: name, 
                description: description,
                urlImg: urlImg
                }]
            }
    )
    await data.save().then(doc => {
        return res.status(200).json({ message: 'Dados salvo com sucesso'});
    }).catch(error => {
        console.log(error);
    });

    }
            
    } catch (error) {
        res.sendStatus(error.message);
    }

    }

    async findFavoriteMovie(req, res){
        let email = await req.body.email;

        let data = await dataMovie.find({ email });
        
        res.json(data);
    }
    
}

export default new UserController;