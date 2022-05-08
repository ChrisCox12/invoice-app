import jwt from 'jsonwebtoken';
import 'dotenv/config';


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


export async function validateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    
    if(!authorizationHeader) return res.json({ success: false, msg: 'You are not authenticated' });
    else {
        // From headers, the token is formatted like 'BEARER *token*'
        // the token is after the space, so split around the space into two item (BEARER and token)
        // and take the second item
        const token = authorizationHeader.split(' ')[1];
        
        jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
            if(err) res.json({ success: false, msg: 'Token is invalid' });
            req.user = user;
            next();
        });
    }
}