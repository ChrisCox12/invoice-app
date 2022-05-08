import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import format from "date-fns/format";
import { 
    AppBar, 
    Box, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,  
    Grid, 
    Stack, 
    Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InvoiceForm from '../components/InvoiceForm.js';
import InvoiceItemsList from '../components/InvoiceItemsList.js';
import axiosInstance from '../utils/axios.js';
import styles from '../styles/Home.module.css';


export default function InvoicePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const invoiceStatusColor = invoice?.status === 'Paid' ? 'statusColorPaid' : invoice?.status === 'Pending' ? 'statusColorPending' : 'statusColorDraft';
    const invoiceStatusBackground = invoice?.status === 'Paid' ? 'statusBgPaid' : invoice?.status === 'Pending' ? 'statusBgPending' : 'statusBgDraft'; 


    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem('user');

        if(!token) {
            navigate('/');
        }
        else{
            getInvoice(id);
        }

        async function getInvoice(id) {
            try {
                const response = await axiosInstance.get(`invoices/${id}`);

                if(response.data.success) {
                    setInvoice(response.data.invoice);
                } 
                else {
                    alert(response.data.msg);
                }
            } 
            catch(error) {
                console.log(error);
            }
        }

        return () => controller.abort();
    }, [id]);


    async function handleDelete(e) {
        e.preventDefault();

        try {
            const response = await axiosInstance.delete(`invoices/${id}`);
            
            if(response.data.success) {
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

    async function handleMarkPaid(e) {
        e.preventDefault();

        const toSubmit = { ...invoice, status: 'Paid' };

        try {
            const response = await axiosInstance.patch(`invoices/${id}`, toSubmit);

            if(response.data.success) {
                setInvoice(toSubmit);
            }
            else {
                alert(response.data.msg)
            }
        } 
        catch(error) {
            console.log(error);    
        }
    }

    async function handleMarkPending(e) {
        e.preventDefault();

        const toSubmit = { ...invoice, status: 'Pending' };

        try {
            const response = await axiosInstance.patch(`invoices/${id}`, toSubmit);

            if(response.data.success) {
                setInvoice(toSubmit);
            }
            else {
                alert(response.data.msg);
            }
        } 
        catch(error) {
            console.log(error);    
        }
    }

    
    if(!invoice) {
        return (
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' height='100vh'>
                <Typography sx={{ color: 'text--1' }}>Loading...</Typography>
            </Box>
        )
    }

    return (
        <Box
            minHeight='100vh'
            width='100%'
            sx={{
                padding: { 
                    xs: '2rem 1.5rem 9rem', 
                    sm: '3rem 2.5rem', 
                    md: '4rem', 
                    lg: '4rem 10rem', 
                    xl: '4rem 22rem 4rem 15.75rem' ,
                    position: 'relative'
                },
                zIndex: 1
            }}
        >
            <Stack spacing={2}>
                <Button
                    startIcon={<ArrowBackIosIcon />}
                    sx={{ width: 'fit-content', color: 'text--1' }}
                    onClick={() => navigate('/')}
                >
                    Go Back
                </Button>

                <Box>
                    <AppBar
                        className={styles.invoiceAppBar}
                        position='static'
                        sx={{ 
                            padding: { xs: '1.5rem', sm: '1.5rem 2rem' } ,
                            bgcolor: 'invoice'
                        }}
                    >
                        <Box
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                width: { xs: '100%', sm: 'auto' },
                                gap: { sm: '1.5rem' }
                            }}
                        >
                            <Typography sx={{ fontWeight: 500, color: 'text--2' }}>Status</Typography>

                            <Box bgcolor={invoiceStatusBackground} padding='0.5rem 1rem' borderRadius='5px'>
                                <Typography sx={{ fontWeight: 700, color: invoiceStatusColor }}>
                                    {invoice.status}
                                </Typography>
                            </Box>
                        </Box>

                        <Stack direction='row' spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Button 
                                className={styles.invoiceButton}
                                sx={{ 
                                    bgcolor: 'editButton',
                                    color: '#7E88C3',
                                    ':hover': { bgcolor: 'editButtonHover' } 
                                }}
                                disabled={showForm ? true: false}
                                onClick={() => setShowForm(!showForm)}
                            >
                                Edit
                            </Button>

                            <Button 
                                sx={{
                                    fontWeight: 600, 
                                    bgcolor: 'deleteButton', 
                                    color: 'white', 
                                    borderRadius: '30px', 
                                    padding: '1rem 1.5rem',
                                    ':hover': { bgcolor: '#FF9797' }
                                }}
                                disabled={showForm ? true: false}
                                onClick={() => setShowDeleteModal(true)}
                            >
                                Delete
                            </Button>

                            {invoice.status === 'Draft' && (
                                <Button 
                                    sx={{ 
                                        fontWeight: 600,
                                        bgcolor: '#FF8F00', 
                                        color: 'white', 
                                        borderRadius: '30px', 
                                        padding: '1rem 1.5rem',
                                        ':hover': { bgcolor: '#F4BA6F' }
                                    }}
                                    disabled={showForm ? true: false}
                                    onClick={handleMarkPending}
                                >
                                    Mark as Pending
                                </Button>
                            )}

                            <Button 
                                sx={{ 
                                    fontWeight: 600,
                                    bgcolor: 'primaryPurple', 
                                    color: 'white', 
                                    borderRadius: '30px', 
                                    padding: '1rem 1.5rem',
                                    ':hover': { bgcolor: 'secondaryPurple' } 
                                }}
                                disabled={showForm ? true: false}
                                onClick={handleMarkPaid}
                            >
                                Mark as Paid
                            </Button>
                        </Stack>
                    </AppBar>

                    <Box
                        sx={{
                            bgcolor: 'invoice',
                            padding: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            borderRadius: '7px'
                        }}
                    >
                        <Grid container mb={{ xs: '2rem', sm: '1.5rem' }}>
                            <Grid item xs={12} sm={6} sx={{ mb: { xs: '2rem', sm: '0' } }}>
                                <Typography sx={{ color: 'text--1', fontWeight: 500, fontSize: '1.25rem' }}>
                                    <Box component='span' sx={{ color: '#7E88C3' }}>#</Box>
                                    {invoice._id}
                                </Typography>

                                <Typography sx={{ color: 'text--3', fontSize: '1.125rem' }}>{invoice.description}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Stack spacing={0} textAlign={{ sm: 'right' }} sx={{ color: 'text--3' }}>
                                    <Typography>{invoice.senderAddress.street}</Typography>
                                    <Typography>{invoice.senderAddress.city}</Typography>
                                    <Typography>{invoice.senderAddress.postCode}</Typography>
                                    <Typography>{invoice.senderAddress.country}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        
                        <Grid container sx={{ mb: { xs: '2.5rem', sm: '3rem' } }}>
                            <Grid item xs={6} sm={3}>
                                <Stack spacing={4}>
                                    <Box>
                                        <Typography sx={{ color: 'text--3' }}>Invoice Date</Typography>
                                        <Typography sx={{ color: 'text--1', fontWeight: 600, fontSize: '1.25rem' }}>{ format(new Date(invoice.created_at), 'dd MMM yyyy') }</Typography>
                                    </Box>
                                    
                                    <Box>
                                        <Typography sx={{ color: 'text--3' }}>Payment Due</Typography>
                                        <Typography sx={{ color: 'text--1', fontWeight: 600, fontSize: '1.25rem' }}>{ format(new Date(invoice.paymentDue), 'dd MMM yyyy') }</Typography>
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <Typography sx={{ color: 'text--3' }}>Bill To</Typography>
                                <Typography sx={{ color: 'text--1', fontWeight: 600, fontSize: '1.25rem' }}>{invoice.clientName}</Typography>
                                
                                <Stack spacing={0} sx={{ color: 'text--3' }}>
                                    <Typography>{invoice.senderAddress.street}</Typography>
                                    <Typography>{invoice.senderAddress.city}</Typography>
                                    <Typography>{invoice.senderAddress.postCode}</Typography>
                                    <Typography>{invoice.senderAddress.country}</Typography>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={5} sx={{ mt: { xs: '2rem', sm: '0' } }}>
                                <Typography sx={{ color: 'text--3' }}>Sent To</Typography>
                                <Typography sx={{ color: 'text--1', fontWeight: 600, fontSize: '1.25rem' }}>{invoice.clientEmail}</Typography>
                            </Grid>
                        </Grid>

                        <InvoiceItemsList items={invoice.items} />

                        <Box 
                            display='flex' 
                            alignItems='center' 
                            justifyContent='space-between'
                            sx={{ 
                                bgcolor: 'amountDueBackground',
                                padding: { xs: '1.5rem', sm: '1.5rem 2rem' },
                                borderRadius: '0 0 7px 7px',
                                color: 'white'
                            }}
                        >
                            <Typography sx={{ fontWeight: 400 }}>Amount Due</Typography>
                            <Typography sx={{ fontWeight: 600, fontSize: '1.75rem' }}>
                                $ {(invoice.total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Stack>

            <InvoiceForm 
                showForm={showForm} 
                setShowForm={setShowForm} 
                invoice={invoice} 
                setInvoice={setInvoice} 
            />

            <Dialog
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                sx={{
                    '.MuiPaper-root': {
                        bgcolor: 'invoice',
                        color: 'text--1',
                        padding: '1.5rem'
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 700, fontSize: '2.5rem' }}>Confirm Deletion</DialogTitle>
                
                <DialogContent>Are you sure you want to delete invoice #{invoice._id}? This action cannot be undone.</DialogContent>
                
                <DialogActions>
                    <Button 
                        onClick={() => setShowDeleteModal(false)}
                        sx={{ 
                            fontWeight: 600,
                            bgcolor: 'editButton', 
                            borderRadius: '30px', 
                            padding: '1rem 1.5rem',
                            color: '#7E88C3',
                            ':hover': { bgcolor: 'editButtonHover' } 
                        }}
                    >
                        Cancel
                    </Button>
                    
                    <Button 
                        onClick={handleDelete} 
                        sx={{
                            fontWeight: 600, 
                            bgcolor: 'deleteButton', 
                            color: 'white', 
                            borderRadius: '30px', 
                            padding: '1rem 1.5rem',
                            ':hover': { bgcolor: '#FF9797' }
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <AppBar 
                position='fixed' 
                sx={{ 
                    top: 'auto', 
                    bottom: 0, 
                    bgcolor: 'invoice', 
                    padding: '1.5rem', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    width: '100%',
                    display: { sm: 'none' },
                    zIndex: 9
                }}
            >
                <Button 
                    className={styles.invoiceButton}
                    sx={{ 
                        bgcolor: 'editButton', 
                        color: '#7E88C3',
                        ':hover': { bgcolor: 'editButtonHover' } 
                    }}
                    disabled={showForm ? true: false}
                    onClick={() => setShowForm(!showForm)}
                >
                    Edit
                </Button>
                
                <Button 
                    className={styles.invoiceButton}
                    sx={{
                        bgcolor: 'deleteButton', 
                        color: 'white', 
                        ':hover': { bgcolor: '#FF9797' }
                    }}
                    disabled={showForm ? true: false}
                    onClick={() => setShowDeleteModal(true)}
                >
                    Delete
                </Button>

                {invoice.status === 'Draft' && (
                    <Button 
                        className={styles.invoiceButton}
                        sx={{ 
                            bgcolor: '#FF8F00', 
                            color: 'white', 
                            ':hover': { bgcolor: '#F4BA6F' }
                        }}
                        disabled={showForm ? true: false}
                        onClick={handleMarkPending}
                    >
                        Mark as Pending
                    </Button>
                )}

                <Button 
                    className={styles.invoiceButton}
                    sx={{ 
                        bgcolor: 'primaryPurple', 
                        color: 'white', 
                        ':hover': { bgcolor: 'secondaryPurple' } 
                    }}
                    disabled={showForm ? true: false}
                    onClick={handleMarkPaid}
                >
                    Mark as Paid
                </Button>
            </AppBar>
        </Box>
    );
}