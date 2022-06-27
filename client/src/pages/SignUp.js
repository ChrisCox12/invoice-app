import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Button, TextField } from "@mui/material";
import axiosInstance from "../utils/axios";


export default function SignUpPage({ isNewUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    async function handleSignUp(e) {
        e.preventDefault();

        const toSubmit = { username: username, password: password };

        try {
            const response = await axiosInstance.post('users/register', toSubmit);
            
            if(response.data.success) {
                isNewUser();
                localStorage.setItem('invoice-app-user', response.data.user.token);
                navigate('/');
            }
            else {
                setErrorMsg(response.data.msg);
            }
        } 
        catch(error) {
            console.log(error);    
        }
    }


    return (
        <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center' bgcolor='primaryPurple'>
            <div style={{ backgroundColor: 'white', padding : '2rem', borderRadius: '7px' }}>
                <Stack component='form' spacing={2} onSubmit={handleSignUp}>
                    {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}

                    <Typography component='h1' variant='h2' sx={{ color: 'primaryPurple', fontWeight: 700, textAlign: 'center' }}>Invoice App</Typography>
                    <Typography>Welcome, please sign up to begin using this app today!</Typography>
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
                    <Button variant='contained' type='submit' sx={{ bgcolor: 'primaryPurple', ':hover': { bgcolor: 'secondaryPurple' } }}>Sign Up</Button>
                    <Button variant='text' type='button' onClick={() => navigate('/')}>Already have an account? Sign in</Button>
                </Stack>
            </div>
        </Box>
    );
}