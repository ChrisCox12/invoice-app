import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from '../styles/Home.module.css';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //console.log(REACT_APP_API_URL)

    useEffect(() => {
        if(localStorage.getItem('user')) {
            navigate('/home');
        }
    }, []);
    

    async function handleSignIn(e) {
        e.preventDefault();

        const toSubmit = { username: username, password: password };

        try {
            const response = await axios.post(REACT_APP_API_URL.concat('users/login'), toSubmit);
            

            console.log(response);

            if(response.data.sucess) {
                
            }
            else {
                alert(response.data.msg);
            }
        } 
        catch(error) {
            console.log(error);
        }
    }

    return (
        <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Stack component='form' spacing={2} onSubmit={handleSignIn}>
                <Typography className={styles.conn}>Login</Typography>
                <TextField
                    label='Username'
                    type='text'
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField 
                    label='Password'
                    type='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='contained' type='submit'>Sign In</Button>
                <Button variant='text' type='button' onClick={() => navigate('/signup')}>No account? Sign up here</Button>
            </Stack>
        </Box>
    )
}