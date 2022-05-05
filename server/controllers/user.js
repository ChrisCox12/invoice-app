import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function getAllUsers(req, res) {
    //console.log(req.user)

    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);

        res.status(404).json({ message: error.message });
    }
}

export async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            username: username,
            password: password
        });

        if(user) {
            //  access token
            const token = jwt.sign(
                {
                    username: username,
                    userId: user._id
                },
                JWT_SECRET_KEY
            );
            
            res.json({ success: true, user: { username, token } });
        }
        else {
            res.json({ success: false, msg: 'Failed to find user' });
        }
        
    } 
    catch(error) {
        console.log(error);

        res.json({ success: false, msg: 'Failed to log user in' });
    }
}

export async function createUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            username: username,
            password: password
        });

        if(!user) {
            const newUser = new User({
                username: username,
                password: password
            });

            await newUser.save();

            console.log(`Creating new user: ${newUser}`);

            //  access token
            const token = jwt.sign(
                {
                    username: username
                },
                JWT_SECRET_KEY
            );

            res.json({ success: true, user: { username, token } });
        }
        else {
            res.json({ success: false, msg: 'Failed to create user' });
        }
    } 
    catch(error) {
        console.log(error);
        
        res.json({ success: false, msg: 'Failed to create user' });
    }
}