import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Login from './pages/Login';
import HomePage from './pages/Home';
import SignUpPage from './pages/SignUp';
import InvoicePage from './pages/Invoice';
import Layout from './components/Layout';


export default function App() {
    const [mode, setMode] = useState(true);
    const [newUser, setNewUser] = useState(false);

    const lightTheme = {
        palette: {
            addButton: '#F9FAFE',
            editButton: '#F9FAFE',
            deleteButton: '#EC5757',
            editButtonHover: '#DFE3FA',
            sidebar: '#373B53',
            invoice: 'white',
            invoiceClientName: '#858BB2',
            appBackground: '#f8f8f8',
            menuBackground: 'white',
            formBackground: 'white',
            inputBackground: 'white',
            datePickerBackground: 'white',
            invoiceItemsBackground: '#F9FAFE',
            amountDueBackground: '#374353',
            inputBorder: 'hsl(0, 0%, 0%, 0.23)',
            'text--1': '#0C0E16',
            'text--2': '#888EB0',
            'text--3': '#7E88C3',
            'text--4': '#7E88C3',
            primaryPurple: '#7C5DFA',
            secondaryPurple: '#9277FF',
            statusColorPaid: '#33D69F',
            statusColorPending: '#FF8F00',
            statusColorDraft: '#7E88C3',
            statusBgPaid: 'hsla(160, 67%, 52%, 0.15)',
            statusBgPending: 'hsla(34, 100%, 50%, 0.15)',
            statusBgDraft: 'hsla(231, 20%, 27%, 0.15)'
        },
        typography: {
            fontFamily: 'Manrope'
        }
    }

    const darkTheme = {
        palette: {
            addButton: '#252945',
            editButton: '#252945',
            deleteButton: '#EC5757',
            editButtonHover: 'white',
            sidebar: '#1E2139',
            invoice: '#1E2139',
            invoiceClientName: 'white',
            appBackground: '#141625',
            menuBackground: '#252945',
            formBackground: '#141625',
            inputBackground: '#252945',
            datePickerBackground: '#1E2139',
            invoiceItemsBackground: '#252945',
            amountDueBackground: '#0C0E16',
            inputBorder: '#252945',
            'text--1': 'white',
            'text--2': '#DFE3FA',
            'text--3': '#DFE3FA',
            'text--4': '#888EB0',
            primaryPurple: '#7C5DFA',
            secondaryPurple: '#9277FF',
            statusColorPaid: '#33D69F',
            statusColorPending: '#FF8F00',
            statusColorDraft: '#7E88C3',
            statusBgPaid: 'hsla(160, 67%, 52%, 0.15)',
            statusBgPending: 'hsla(34, 100%, 50%, 0.15)',
            statusBgDraft: 'hsla(231, 20%, 27%, 0.15)'
        },
        typography: {
            fontFamily: 'Manrope'
        }
    }

    const customTheme = createTheme(mode ? lightTheme : darkTheme);

    function isNewUser() {
        setNewUser(true);
    }

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route element={<Layout setMode={setMode} mode={mode} />}>
                        <Route index element={<HomePage newUser={newUser} />} />
                        <Route path='home' element={<HomePage newUser={newUser} />}/>
                        <Route path='invoice/:id' element={<InvoicePage />} />
                    </Route>
                    
                    
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUpPage isNewUser={isNewUser} />} />
                </Routes>
            </Router>
        </ThemeProvider>  
    );
}
