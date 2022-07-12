import jwt from 'jsonwebtoken';
import auth from '../config/auth.js';

export const Autheticated = async (req, res, next) => {
    // let authUser = req.headers.Authorization;
    let authUser = req.body.Authorization;
    
    if(!authUser){
        return res.status(401).json({error: 'Invalid User'});
    }

    try {
        let tokenVerificated = jwt.verify(authUser, auth.secret); 
        if(tokenVerificated){
            return next();
        }
    } catch (error) {
        return res.status(401).json({error: 'Invalid User'});
    }
}