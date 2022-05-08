import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import axiosInstance from "../utils/axios.js";
import styles from '../styles/Home.module.css';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if(localStorage.getItem('user')) {
            navigate('/');
        }
    }, []);
    

    async function handleSignIn(e) {
        e.preventDefault();

        const toSubmit = { username: username, password: password };

        try {
            const response = await axiosInstance.post('users/login', toSubmit);

            if(response.data.success) {
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
    );
}