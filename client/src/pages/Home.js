import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { Box, AppBar, Typography, Menu, MenuItem, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmptyIllustration from '../assets/illustration-empty.svg';
import InvoicesList from "../components/InvoicesList";
import InvoiceForm from "../components/InvoiceForm";
import axiosInstance from "../utils/axios";
import styles from '../styles/Home.module.css';


function CustomCheckBoxIcon(props) {
    return (
        <CheckBoxIcon 
            sx={{ mr: '0.5rem', color: 'primaryPurple' }}
            {...props}
        />
    )
}

function CustomBlankCheckBoxIcon(props) {
    return (
        <CheckBoxOutlineBlankIcon
            sx={{ mr: '0.5rem' }}
            {...props}
        />
    )
}


export default function HomePage({ newUser }) {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        const controller = new AbortController();
        const userToken = localStorage.getItem('invoice-app-user');

        if(!userToken) {
            navigate('/login');
        }
        else {
            if(newUser) return;

            const decodedToken = jwt_decode(userToken);

            getInvoices(decodedToken); 
        }

        async function getInvoices(user) {
            try {
                const response = await axiosInstance.get(`invoices/user/${user.username}`);

                if(response.data.success) {
                    setInvoices(response.data.invoices);
                    setFilteredInvoices(response.data.invoices);
                }
                else {
                    setErrorMsg(response.data.msg);
                }
            } 
            catch(error) {
                console.log(error);  
            }
        }

        return () => controller.abort();
    }, [newUser]);


    function handleClose() {
        setAnchorEl(null);
        setFilterOpen(false);
    }

    function handleMenu(e) {
        setAnchorEl(e.currentTarget);
        setFilterOpen(true);
    }

    function handleFilter(option) {
        if(filter === option) {
            setFilter('');
            setFilteredInvoices([...invoices]);
        }
        else {
            setFilter(option);

            switch (option) {
                case 'Draft':
                    setFilteredInvoices([
                        ...invoices.filter(invoice => invoice.status === 'Draft')
                    ]);
                    break;
                case 'Pending':
                    setFilteredInvoices([
                        ...invoices.filter(invoice => invoice.status === 'Pending')
                    ]);
                    break;
                default:
                    setFilteredInvoices([
                        ...invoices.filter(invoice => invoice.status === 'Paid')
                    ]);
                    break;
            }
        }

        setFilterOpen(false);
        setAnchorEl(null);
    }

    function appendToFilteredInvoices(newInvoice) {
        setFilteredInvoices([...filteredInvoices, newInvoice]);
    }


    return (
        <Box
        width='100%' 
        height='100vh'
        sx={{
            p: { 
                xs: '2rem 1.5rem', 
                sm: '3.5rem 5rem', 
                lg: '4.5rem 15.75rem',
                xl: '5rem 25rem' 
            },
            minWidth: { xs: '24rem', md: 'auto' },
            overflowY:  'scroll' ,
            position: 'relative'
        }}
        >
            <AppBar className={styles.homeAppBar} position='static'>
                <Box>
                    <Typography
                        component='h1'
                        variant='h4'
                        fontWeight={700}
                        sx={{ color: 'text--1' }}
                    >
                        Invoices
                    </Typography>

                    <Typography sx={{ color: 'text--2' }}>
                        {invoices.length > 0 ?
                            <>{invoices.length} invoices</>
                            :
                            <>No Invoices</>
                        }
                    </Typography>
                </Box>

                <Box>
                    <Button
                        variant='text'
                        endIcon={filterOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        onClick={handleMenu}
                        sx={{ color: 'secondaryPurple', mr: '0.75rem' }}
                    >
                        Filter
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{ 
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: 'menuBackground'
                            }
                        }}
                    >
                        <MenuItem onClick={() => handleFilter('Draft')} sx={{ color: 'text--1' }}>
                            {filter === 'Draft' ?
                                <CustomCheckBoxIcon />
                                :
                                <CustomBlankCheckBoxIcon />
                            }
                            Draft
                        </MenuItem>
                        <MenuItem onClick={() => handleFilter('Pending')} sx={{ color: 'text--1' }}>
                            {filter === 'Pending' ?
                                <CustomCheckBoxIcon />
                                :
                                <CustomBlankCheckBoxIcon />
                            }
                            Pending
                        </MenuItem>
                        <MenuItem onClick={() => handleFilter('Paid')} sx={{ color: 'text--1' }}>
                            {filter === 'Paid' ?
                                <CustomCheckBoxIcon />
                                :
                                <CustomBlankCheckBoxIcon />
                            }
                            Paid
                        </MenuItem>
                    </Menu>

                    <Button
                        variant='text'
                        onClick={() => setShowForm(true)}
                        sx={{
                            color: 'white',
                            bgcolor: 'primaryPurple',
                            borderRadius: '1.5rem',
                            padding: '0.25rem 0.75rem 0.25rem 0.25rem',
                            ':hover': { bgcolor: 'secondaryPurple' }
                        }}
                    >
                        <AddCircleIcon fontSize='large' sx={{ mr: '0.25rem' }}  />
                        New
                    </Button>
                </Box>
            </AppBar>

            {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}

            {invoices.length > 0 ?
               <InvoicesList invoices={filteredInvoices} />
               :
               <Box>
                   <img src={EmptyIllustration} alt='No invoices found' />
                   <Typography sx={{ color: 'text--1' }}>
                       There is nothing here. {' '} 
                       Create an invoice by clicking the New Invoice button and get started
                    </Typography>
               </Box> 
            }

            <InvoiceForm 
                showForm={showForm} 
                setShowForm={setShowForm} 
                appendToFilteredInvoices={appendToFilteredInvoices} 
            />
        </Box>  
    );
}