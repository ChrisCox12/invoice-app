import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Home';
import theme from './theme';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import SignUpPage from './pages/SignUp';
import InvoicePage from './pages/Invoice';
import Layout from './components/Layout';



export default function App() {
    const [mode, setMode] = useState(true);

    const lightTheme = {
        palette: {
            addButton: '#F9FAFE',
            editButton: '#F9FAFE',
            sidebar: '#373B53',
            invoice: 'white',
            appBackground: '#f8f8f8',
            menuBackground: 'white',
            formBackground: 'white',
            inputBackground: 'white',
            datePickerBackground: 'white',
            inputBorder: 'hsl(0, 0%, 0%, 0.23)',
            'text--1': '#0C0E16',
            'text--2': '#888EB0',
            'text--3': '#7E88C3',
            'text--4': '#7E88C3',
            primaryPurple: '#7C5DFA',
            secondaryPurple: '#9277FF'
        },
        typography: {
            fontFamily: 'Manrope'
        }
    }

    const darkTheme = {
        palette: {
            addButton: '#252945',
            editButton: '#252945',
            sidebar: '#1E2139',
            invoice: '#1E2139',
            appBackground: '#141625',
            menuBackground: '#252945',
            formBackground: '#141625',
            inputBackground: '#252945',
            datePickerBackground: '#1E2139',
            inputBorder: '#252945',
            'text--1': 'white',
            'text--2': '#DFE3FA',
            'text--3': '#DFE3FA',
            'text--4': '#888EB0',
            primaryPurple: '#7C5DFA',
            secondaryPurple: '#9277FF'
        },
        typography: {
            fontFamily: 'Manrope'
        }
    }

    /* const darkTheme = createTheme({
        palette: {
            mode: mode
        },
        typography: {
            fontFamily: 'Manrope'
        }
    }); */

    const customTheme = createTheme(mode ? lightTheme : darkTheme);

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route element={<Layout setMode={setMode} mode={mode} />}>
                        <Route index element={<HomePage setMode={setMode} mode={mode} />} />
                        <Route path='home' element={<HomePage setMode={setMode} mode={mode} />}/>
                        <Route path='invoice' element={<InvoicePage />} />
                    </Route>
                    
                    
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUpPage />} />
                </Routes>
            </Router>
        </ThemeProvider>  
    );
}
