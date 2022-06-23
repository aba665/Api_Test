import jwt from 'jsonwebtoken';
import auth from '../../Dev-Server/src/config/auth.js';

export const Autheticated = async (req, res, next) => {
    // let authUser = req.headers.Authorization;
    let authUser = req.body.Authorization;
    console.log('Headers = ', authUser);
    if(!authUser){
        console.log('sem autenticação');
        return res.status(401).json({error: 'Invalid User'});
    }

    try {
        let tokenVerificated = jwt.verify(authUser, auth.secret); 
        if(tokenVerificated){
            
            console.log('usuario verificado')
            return next();
        }
    } catch (error) {
        return res.status(401).json({error: 'Invalid User'});
    }
}