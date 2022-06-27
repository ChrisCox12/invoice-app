import { useNavigate } from "react-router-dom";
import { AppBar, Box, Divider, IconButton, Typography } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.svg';
import styles from '../styles/Home.module.css';


export default function Sidebar({ setMode, mode }) {
    const navigate = useNavigate();


    async function handleLogOut(e) {
        e.preventDefault();

        localStorage.removeItem('invoice-app-user');
        navigate('/login');
    }


    return (
        <AppBar
            position="static"
            sx={{
                height: { xs: '4.5rem', md: '100vh' },
                width: { xs: '100%', md: '6.5rem'},
                minWidth: { xs: '24rem', md: 'auto' },
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: { md: '0 15px 0 0'},
                bgcolor: 'sidebar'
            }}
        >
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                bgcolor='#7C5DFA'
                position='relative'
                overflow='hidden'
                borderRadius='0 15px 15px 0'
                sx={{
                    height: { xs: '4.5rem', md: '6.5rem' },
                    width: { xs: '5rem', md: '100%' }
                }}
            >
                <img src={logo} style={{ zIndex: 2 }} />
                <Box className={styles.logoBottomHalf} /> 
            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { md: 'column' },
                    width: { md: '100%' }
                }}
            >
                <IconButton sx={{ p: '1.5rem', color: '#f8f8f8' }} onClick={() => setMode(!mode)}>
                    {mode ? <LightModeIcon/> : <DarkModeIcon />}
                </IconButton>

                <Divider 
                    flexItem 
                    sx={{ 
                        borderColor: '#494E6E', 
                        borderWidth: { xs: '0 0 0 1px', md: '0 0 1px 0' } 
                    }} 
                />

                <Box 
                    sx={{
                        mt: { md: '1.5rem' },
                        mb: { md: '1.5rem' },
                        ml: { xs: '1.5rem', md: 'auto' },
                        mr: { xs: '1.5rem', md: 'auto' }
                    }}
                >
                    <IconButton onClick={handleLogOut}>
                        <LogoutIcon
                            sx={{ color: '#f8f8f8' }}
                        />
                    </IconButton>
                    <Typography>Logout</Typography>
                </Box>
            </Box>
        </AppBar>
    );
}