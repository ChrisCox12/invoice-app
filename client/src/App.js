import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Home';
import theme from './theme';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import SignUpPage from './pages/SignUp';



export default function App() {
    const [mode, setMode] = useState('light');

    const darkTheme = createTheme({
        palette: {
            mode: mode
        },
        typography: {
            fontFamily: 'Manrope'
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                </Routes>
            </Router>
        </ThemeProvider>  
    );
}
