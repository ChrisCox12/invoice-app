import { Stack, Typography, Box, Grid } from "@mui/material";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

export default function InvoicesList({ invoices }) {
    const navigate = useNavigate();
    
    return (
        <Stack spacing={2} width='100%'>
            {invoices.map(invoice => {
                const invoiceTotal = (invoice.total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const invoiceDueDate = format(new Date(invoice.paymentDue), 'dd MMM yyyy');
                const invoiceStatusColor = invoice.status === 'Paid' ? 'statusColorPaid' : invoice.status === 'Pending' ? 'statusColorPending' : 'statusColorDraft'; 
                const invoiceStatusBackground = invoice.status === 'Paid' ? 'statusBgPaid' : invoice.status === 'Pending' ? 'statusBgPending' : 'statusBgDraft';
                console.log(invoiceStatusColor)
                return (
                    <Box
                        display='grid' 
                        gridTemplateColumns='repeat(12, 1fr)' 
                        gap={2} 
                        width='100%' 
                        bgcolor='invoice' 
                        padding='1.5rem' 
                        key={invoice._id}
                        sx={{ ':hover': { cursor: 'pointer' }, fontSize: { md: '1.125rem' }, borderRadius: '7px' }}
                        onClick={() => navigate('/invoice/'.concat(invoice._id))}
                    >
                        <Box 
                            gridColumn={{ xs: 'span 6', sm: 'span 2' }}  
                            sx={{ 
                                whiteSpace: 'nowrap', 
                                textOverflow: 'ellipsis', 
                                overflow: 'hidden', 
                                fontWeight: 600,
                                color: 'text--1',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Box component='span' sx={{ color: '#7E88C3' }}>#</Box>
                            {invoice._id}
                        </Box>

                        <Box 
                            gridColumn={{ sm: 'span 3' }} 
                            sx={{ display: { xs: 'none', sm: 'block' }, color: 'text--2' }}
                        >
                            Due {invoiceDueDate}
                        </Box>

                        <Box 
                            gridColumn={{ xs: 'span 6', sm: 'span 3' }} 
                            textAlign={{ xs: 'right', sm: 'left' }} 
                            sx={{ 
                                color: 'invoiceClientName', 
                                display: 'flex',
                                alignItems: 'center' 
                            }}
                        >
                            {invoice.clientName}
                        </Box>

                        <Box 
                            gridColumn={{ sm: 'span 2' }} 
                            sx={{ 
                                display: { xs: 'none', sm: 'flex' }, 
                                fontWeight: 700, 
                                textAlign: { xs: 'left', sm: 'right' }, 
                                whiteSpace: 'nowrap',
                                color: 'text--1',
                                alignItems: 'center'
                            }}
                        >
                            $ {invoiceTotal}
                        </Box>

                        <Box gridColumn={{ xs: 'span 6' }} sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <Typography>Due {invoiceDueDate}</Typography>
                            <Typography sx={{ color: 'text--1' }}>$ {invoiceTotal}</Typography>
                        </Box>

                        <Box 
                            gridColumn={{ xs: 'span 6', sm: 'span 2' }} 
                            fontWeight={600} 
                            display='flex' 
                            alignItems='center' 
                            justifyContent='center' 
                            bgcolor={invoiceStatusBackground}
                            sx={{ borderRadius: '5px', color: invoiceStatusColor }}
                        >
                            {invoice.status}
                        </Box>
                    </Box>
                );
            })}
        </Stack>
    )
}