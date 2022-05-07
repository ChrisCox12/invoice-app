import { Box, Typography, Stack, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import styles from '../styles/Home.module.css';
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();

        const toSubmit = { username: username, password: password };

        try {
            //const response = await axios.post(REACT_APP_API_URL.concat('users/register'), toSubmit);
            const response = await api.post('users/register', toSubmit);

            console.log(response);
            
            if(response.data.success) {
                //const { user } = response.data;
                localStorage.setItem('user', response.data.user.token);
                
                navigate('/');
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
            <Stack component='form' spacing={2} onSubmit={handleSignUp}>
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
                <Button variant='contained' type='submit'>Sign Up</Button>
                <Button variant='text' type='button' onClick={() => navigate('/')}>Already have an account? Sign in</Button>
            </Stack>
        </Box>
    )
}