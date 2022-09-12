import loginService from '../service/login.service.js';
import jwt from 'jsonwebtoken';
const SECRET = 'ws_project';

async function login(req, res, next) {
    try {
        let user = req.body;
        user = await loginService.login(user);

        //gerar token
        if(user){
        const token =  jwt.sign( {userId:user.userid, userClass:user.userclass }, SECRET, { expiresIn:3000 });
        res.json({auth: token});
        };
        
        res.status(401).end();

    } catch (error) {
        next(error)
    }
}

export default {
    login
}