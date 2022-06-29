import { useEffect, useState } from "react";
import { 
    AppBar, 
    Box, 
    Button, 
    Grid, 
    IconButton, 
    Menu, 
    MenuItem, 
    Slide, 
    Stack, 
    TextField, 
    Typography 
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import jwtDecode from "jwt-decode";
import axiosInstance from "../utils/axios";
import styles from '../styles/Home.module.css';


function CustomTextField(props) {
    return (
        <TextField 
            sx={{
                color: 'text--1',
                '& .MuiOutlinedInput-input': {
                    borderRadius: '4px',
                    color: 'text--1',
                    bgcolor: 'inputBackground'
                }
            }}
            {...props}
        />
    );
}

function CustomInputLabel(props) {
    return (
        <Typography 
            sx={{ color: 'text--4' }}
            {...props}
        />
    );
}

function CustomSectionHead(props) {
    return (
        <Typography 
            sx={{ color: 'primaryPurple' }}
            {...props}
        />
    );
}


export default function InvoiceForm({ showForm, setShowForm, invoice, setInvoice, appendToFilteredInvoices }) {
    const blankInvoiceForm = {
        clientName: '',
        clientEmail: '',
        description: '',
        status: 'Pending',
        clientAddress: {
            street: '',
            city: '',
            postCode: '',
            country: ''
        },
        senderAddress: {
            street: '',
            city: '',
            postCode: '',
            country: ''
        },
        paymentTerm: 1,
        items: [],
        total: 0.00,
        created_at: Date.now(),
        paymentDue: Date.now()
    };
    const [isEdit, setIsEdit] = useState(false);
    const [formInvoice, setFormInvoice] = useState(blankInvoiceForm);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');


    useEffect(() => {
        if(invoice) {
            setIsEdit(true);
            setFormInvoice(invoice);
            setItems([...invoice.items]);
        }
        
        if(localStorage.getItem('user')){
            const decodedToken = jwtDecode( localStorage.getItem('invoice-app-user') );
            setUser(decodedToken); 
        }
    }, []);


    function handleClose() {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    function handleMenu(e) {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    function handlePaymentTerm(option) {
        setFormInvoice({ 
            ...formInvoice,
            paymentTerm: option
        });
        setAnchorEl(null);
        setOpenMenu(false);
    }

    function handleAddItem() {
        const newItems = [...items, { name: '', price: 0, quantity: 0, total: 0 }];

        setItems([...newItems]);
    }

    function handleRemoveItem(idx) {
        const newItems = [...items];

        setItems([
            ...newItems.filter((item, index) => index !== idx)
        ]);
    }

    function handleDiscard() {
        setShowForm(false);
        setFormInvoice(blankInvoiceForm);
        setItems([]);
    }

    function handleItemsChange(index, field, value) {
        const newItems = [...items];

        switch(field) {
            case 'name':
                newItems[index].name = value;
                break;
            case 'price':
                newItems[index].price = value;
                newItems[index].total = newItems[index].price * newItems[index].quantity;
                break;
            case 'quantity':
                newItems[index].quantity = value;
                newItems[index].total = newItems[index].price * newItems[index].quantity;
                break;
            default: 
                break;
        }

        setItems([...newItems]);
    }

    function handleClientChange(e) {
        switch(e.target.name) {
            case 'clientStreet':
                setFormInvoice({ 
                    ...formInvoice, 
                    clientAddress: { 
                        ...formInvoice.clientAddress, 
                        street: e.target.value 
                    } 
                });
                break;
            case 'clientCity':
                setFormInvoice({ 
                    ...formInvoice, 
                    clientAddress: { 
                        ...formInvoice.clientAddress, 
                        city: e.target.value 
                    } 
                });
                break;
            case 'clientPost':
                setFormInvoice({ 
                    ...formInvoice, 
                    clientAddress: { 
                        ...formInvoice.clientAddress, 
                        postCode: e.target.value 
                    } 
                });
                break;
            case 'clientCountry':
                setFormInvoice({ 
                    ...formInvoice, 
                    clientAddress: { 
                        ...formInvoice.clientAddress, 
                        country: e.target.value 
                    } 
                });
                break;
            case 'clientName':
                setFormInvoice({
                    ...formInvoice,
                    clientName: e.target.value
                });
                break;
            case 'clientEmail':
                setFormInvoice({
                    ...formInvoice,
                    clientEmail: e.target.value
                });
                break;
            default: 
                break;
        }
    }

    function handleSenderChange(e) {
        switch(e.target.name) {
            case 'senderStreet':
                setFormInvoice({ 
                    ...formInvoice, 
                    senderAddress: { 
                        ...formInvoice.senderAddress, 
                        street: e.target.value 
                    } 
                });
                break;
            case 'senderCity':
                setFormInvoice({ 
                    ...formInvoice, 
                    senderAddress: { 
                        ...formInvoice.senderAddress, 
                        city: e.target.value 
                    } 
                });
                break;
            case 'senderPost':
                setFormInvoice({ 
                    ...formInvoice, 
                    senderAddress: { 
                        ...formInvoice.senderAddress, 
                        postCode: e.target.value 
                    } 
                });
                break;
            case 'senderCountry':
                setFormInvoice({ 
                    ...formInvoice, 
                    senderAddress: { 
                        ...formInvoice.senderAddress, 
                        country: e.target.value 
                    } 
                });
                break;
            default: 
                break;
        }
    }

    async function handleSaveChanges(e) {
        e.preventDefault();

        let total = 0;

        for(let i = 0; i < items.length; i++) {
            total += items[i].total;
        }

        const toSubmit = { ...formInvoice, total: total, items: items };

        try {
            const response = await axiosInstance.patch(`invoices/${invoice._id}`, toSubmit);

            if(response.data.success) {
                setInvoice(toSubmit);
                setShowForm(false);
            }
            else {
                setErrorMsg(response.data.msg);
            }
        } 
        catch(error) {
            console.log(error);    
        }
    }

    async function handleSaveDraft(e) {
        e.preventDefault();

        let total = 0;

        for(let i = 0; i < items.length; i++) {
            total += items[i].total;
        }

        const toSubmit = { 
            ...formInvoice, 
            items: items, 
            total: total, 
            status: 'Draft', 
            created_by: user.username 
        };

        try {
            const response = await axiosInstance.post('invoices', toSubmit);

            if(response.data.success) {
                appendToFilteredInvoices({ ...toSubmit, _id: response.data.id });
                setShowForm(false);
            }
            else {
                setErrorMsg(response.data.msg);
            }
        } 
        catch(error) {
            console.log(error);    
        }
    }

    async function handleSave(e) {
        e.preventDefault();

        let total = 0;

        for(let i = 0; i < items.length; i++) {
            total += items[i].total;
        }

        const toSubmit = { 
            ...formInvoice, 
            items: items, 
            status: 'Pending', 
            total: total, 
            created_by: user.username 
        };

        try {
            const response = await axiosInstance.post('invoices', toSubmit);

            if(response.data.success) {
                appendToFilteredInvoices({ ...toSubmit, _id: response.data.id });
                setShowForm(false);
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
        <Slide direction='right' in={showForm} mountOnEnter unmountOnExit>
            <Box
                sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: { xs: 0 },
                    minHeight: '100%',
                    width: { xs: '100%', sm: '80%', md: '45rem' },
                    zIndex: 10,
                    bgcolor: 'formBackground',
                    padding: { xs: '2rem 1.5rem 0' },
                    maxHeight: { sm: '100%', md: '100%' },
                    overflowY: { sm: 'scroll', md: 'scroll' }
                }}
            >
                <Button onClick={() => setShowForm(false)} startIcon={<KeyboardArrowLeftIcon />}>Go Back</Button>

                <Typography
                    sx={{ 
                        color: 'text--1', 
                        fontSize: '1.5rem', 
                        fontWeight: 600, 
                        mb: '2rem' 
                    }}
                >
                    {isEdit ? 
                        <>
                            Edit {' '}
                            <Box component='span' sx={{ color: '#7E88C3' }}>#</Box>
                            {invoice._id}
                        </>
                        :
                        <>New Invoice</>
                    }
                </Typography>

                {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}

                <Stack spacing={{ xs: '2.5rem' }}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CustomSectionHead>Bill From</CustomSectionHead>
                            </Grid>

                            <Grid item xs={12}>
                                <CustomInputLabel>Street Address</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth 
                                    name='senderStreet' 
                                    value={formInvoice.senderAddress.street} 
                                    onChange={handleSenderChange}
                                />
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <CustomInputLabel>City</CustomInputLabel>
                                <CustomTextField
                                    fullWidth
                                    name='senderCity' 
                                    value={formInvoice.senderAddress.city} 
                                    onChange={handleSenderChange}
                                />
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <CustomInputLabel>Post Code</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth 
                                    name='senderPost' 
                                    value={formInvoice.senderAddress.postCode} 
                                    onChange={handleSenderChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <CustomInputLabel>Country</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth 
                                    name='senderCountry' 
                                    value={formInvoice.senderAddress.country} 
                                    onChange={handleSenderChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>   
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CustomSectionHead>Bill To</CustomSectionHead>
                            </Grid>

                            <Grid item xs={12}>
                                <CustomInputLabel>Client's Name</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth 
                                    name='clientName' 
                                    value={formInvoice.clientName} 
                                    onChange={handleClientChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <CustomInputLabel>Client's Email</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth
                                    name='clientEmail' 
                                    value={formInvoice.clientEmail} 
                                    onChange={handleClientChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <CustomInputLabel>Street Address</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth 
                                    name='clientStreet' 
                                    value={formInvoice.clientAddress.street} 
                                    onChange={handleClientChange}
                                />
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <CustomInputLabel>City</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth
                                    name='clientCity' 
                                    value={formInvoice.clientAddress.city} 
                                    onChange={handleClientChange}
                                />
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <CustomInputLabel>Post Code</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth 
                                    name='clientPost' 
                                    value={formInvoice.clientAddress.postCode} 
                                    onChange={handleClientChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <CustomInputLabel>Country</CustomInputLabel>
                                <CustomTextField 
                                    fullWidth
                                    name='clientCountry' 
                                    value={formInvoice.clientAddress.country} 
                                    onChange={handleClientChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} display='flex' flexDirection='column'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <CustomInputLabel>Invoice Date</CustomInputLabel>
                                    <DatePicker 
                                        value={formInvoice.paymentDue}
                                        onChange={(newValue) => {
                                            setFormInvoice({
                                                ...formInvoice,
                                                paymentDue: newValue
                                            })
                                        }}
                                        renderInput={(params) => 
                                            <TextField 
                                                {...params} 
                                                sx={{ 
                                                    '.MuiOutlinedInput-root': { 
                                                        color: 'text--1', 
                                                        bgcolor: 'datePickerBackground', 
                                                        fontWeight: 500,
                                                        '& :disabled': {
                                                            color: 'primaryPurple'
                                                        }
                                                    }
                                                }} 
                                            />
                                        }
                                        minDate={Date.now()}
                                        disabled={isEdit === true ? true: false}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <CustomInputLabel>Payment Terms</CustomInputLabel>
                                <Box
                                    sx={{ 
                                        bgcolor: 'inputBackground',
                                        borderColor: 'inputBorder', 
                                        borderWidth: '1px', 
                                        borderStyle: 'solid', 
                                        borderRadius: '4px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        padding: '1rem',
                                        ':hover': { cursor: 'pointer' },
                                        '.MuiSvgIcon-root': { color: 'primaryPurple' }
                                    }}
                                    onClick={handleMenu}
                                >
                                    <Typography sx={{ color: 'text--1' }}>{`Net ${formInvoice.paymentTerm} Days`}</Typography>
                                    {openMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </Box>

                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{ 
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    sx={{ 
                                        '.MuiList-root': { color: 'text--1' },
                                        '& .MuiPaper-root': { 
                                            width: { xs: 'calc( 100% - (1.5rem * 2) )', md: '40%' }, 
                                            backgroundColor: 'menuBackground'
                                        } 
                                    }}
                                >
                                    <MenuItem onClick={() => handlePaymentTerm(1)}>Net 1 Day</MenuItem>
                                    <MenuItem onClick={() => handlePaymentTerm(7)}>Net 7 Days</MenuItem>
                                    <MenuItem onClick={() => handlePaymentTerm(14)}>Net 14 Days</MenuItem>
                                    <MenuItem onClick={() => handlePaymentTerm(30)}>Net 30 Days</MenuItem>
                                </Menu>
                            </Grid>

                            <Grid item xs={12}>
                                <CustomInputLabel>Project Description</CustomInputLabel>
                                <TextField 
                                    fullWidth 
                                    value={formInvoice.description}
                                    onChange={(e) => setFormInvoice({ ...formInvoice, description: e.target.value })}
                                    sx={{
                                        '& .MuiOutlinedInput-input': { 
                                            borderRadius: '4px',
                                            color: 'text--1', 
                                            bgcolor: 'inputBackground' 
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <Typography
                            sx={{ 
                                color: 'text--4', 
                                fontSize: '1.5rem', 
                                fontWeight: 600, 
                                mb: '1.5rem' 
                            }}
                        >
                            Item List
                        </Typography>

                        <Stack spacing={4} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                            {items.map((item, index) => {
                                return (
                                    <Box key={index}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <CustomInputLabel>Item Name</CustomInputLabel>
                                                <CustomTextField 
                                                    fullWidth
                                                    value={item.name}
                                                    onChange={(e) => handleItemsChange(index, 'name', e.target.value)}
                                                />
                                            </Grid>

                                            <Grid item xs={2}>
                                                <CustomInputLabel>Qty.</CustomInputLabel>
                                                <input
                                                    type='number'
                                                    value={item.quantity}
                                                    className={styles.input}
                                                    min={0}
                                                    max={999}
                                                    onChange={(e) => handleItemsChange(index, 'quantity', e.target.value)}
                                                />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <CustomInputLabel>Price</CustomInputLabel>
                                                <input
                                                    type='number'
                                                    value={item.price}
                                                    className={styles.input}
                                                    min={0}
                                                    onChange={(e) => handleItemsChange(index, 'price', e.target.value)}
                                                />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <CustomInputLabel>Total</CustomInputLabel>
                                                <Box display='flex' alignItems='center' height='100%'>
                                                    <Typography sx={{ color: '#888EB0' }}>{item.total}</Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={1} display='flex' alignItems='center'>
                                                <IconButton onClick={() => handleRemoveItem(index)} sx={{ '.MuiSvgIcon-root': { color: '#888EB0' } }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                );
                            })}
                        </Stack>

                        <Stack spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item sm={5}>
                                        <CustomInputLabel>Item Name</CustomInputLabel>
                                    </Grid>

                                    <Grid item sm={2}>
                                        <CustomInputLabel>Qty.</CustomInputLabel>
                                    </Grid>

                                    <Grid item sm={2}>
                                        <CustomInputLabel>Price</CustomInputLabel>
                                    </Grid>
                                    
                                    <Grid item sm={3}>
                                        <CustomInputLabel>Total</CustomInputLabel>
                                    </Grid>
                                </Grid>
                            </Box>

                            {items.map((item, index) => {
                                return (
                                    <Box key={index}>
                                        <Grid container spacing={2}>
                                            <Grid item sm={5}>
                                                <CustomTextField
                                                    fullWidth
                                                    value={item.name}
                                                    onChange={(e) => handleItemsChange(index, 'name', e.target.value)}
                                                    
                                                />
                                            </Grid>

                                            <Grid item sm={2}>
                                                <input
                                                    type='number'
                                                    value={item.quantity}
                                                    className={styles.input}
                                                    min={0}
                                                    max={999}
                                                    onChange={(e) => handleItemsChange(index, 'quantity', e.target.value)}
                                                />
                                            </Grid>
                                            
                                            <Grid item sm={2}>
                                                <input
                                                    type='number'
                                                    value={item.price}
                                                    className={styles.input}
                                                    min={0}
                                                    onChange={(e) => handleItemsChange(index, 'price', e.target.value)}
                                                />
                                            </Grid>
                                            
                                            <Grid item sm={2}>
                                                <Box display='flex' alignItems='center' height='100%'>
                                                    <Typography sx={{ color: '#888EB0', fontWeight: 600 }}>{item.total}</Typography>
                                                </Box>
                                            </Grid>
                                            
                                            <Grid item sm={1}>
                                                <IconButton onClick={() => handleRemoveItem(index)} sx={{ '.MuiSvgIcon-root': { color: '#888EB0' } }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                );
                            })}
                        </Stack>

                        <Button
                            startIcon={<AddIcon />}
                            sx={{ 
                                width: '100%', 
                                padding: '1rem', 
                                borderRadius: '25px', 
                                bgcolor: 'addButton',
                                mt: '2rem'
                            }}
                            onClick={handleAddItem}
                        >
                            Add New Item
                        </Button>
                    </Box>
                </Stack>

                {errorMsg && <Typography textAlign='center' bgcolor='red' color='white' fontWeight={700} borderRadius='7px' padding='0.5rem'>Error: {errorMsg}</Typography>}

                <AppBar
                    position='static'
                    sx={{
                        
                        width: '100%',
                        mt: '2rem',
                        bgcolor: 'invoice',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: isEdit ? 'right' : 'space-between',
                        padding: '2rem',
                        borderRadius: '0 15px 0 0',
                        position: 'absolute',
                        left: 0
                    }}
                >
                    {!isEdit && (
                        <>
                            <Button 
                                className={styles.invoiceButton}
                                onClick={handleDiscard} 
                                sx={{
                                    bgcolor: '#F9FAFE', 
                                    color: '#7E88C3'
                                }}
                            >
                                Discard
                            </Button>
                            
                            <Box>
                                <Button 
                                    className={styles.invoiceButton}
                                    onClick={handleSaveDraft}
                                    sx={{
                                        bgcolor: '#373B53', 
                                        color: 'text--2'
                                    }}    
                                >
                                    Save as Draft
                                </Button>

                                <Button 
                                    className={styles.invoiceButton}
                                    onClick={handleSave} 
                                    sx={{ 
                                        bgcolor: 'primaryPurple', 
                                        color: 'white', 
                                        ml: '1rem',
                                        ':hover': { bgcolor: 'secondaryPurple' } 
                                    }}
                                >
                                    Save & Send
                                </Button>
                            </Box>
                        </>
                    )}

                    {isEdit && (
                        <>
                            <Box>
                                <Button 
                                    className={styles.invoiceButton}
                                    sx={{ 
                                        color: 'text--3', 
                                        bgcolor: 'editButton'
                                    }}
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </Button>

                                <Button 
                                    className={styles.invoiceButton}
                                    sx={{ 
                                        color: 'white', 
                                        bgcolor: 'primaryPurple', 
                                        ml: '1rem',
                                        ':hover': { bgcolor: 'secondaryPurple' }  
                                    }}
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        </>
                    )}
                </AppBar>
            </Box>
        </Slide>
    );
}