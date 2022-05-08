import { 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography } from '@mui/material';
import styles from '../styles/Home.module.css';


export default function InvoiceItemsList({ items }) {
    return (
        <TableContainer sx={{ bgcolor: 'invoiceItemsBackground', borderRadius: '7px 7px 0 0', padding: '0 0 1rem 0' }}>
            <Table>
                <TableHead sx={{ display: { xs: 'none', sm: 'table-row-group' } }}>
                    <TableRow>
                        <TableCell className={styles.tableHeadCell} align='left' sx={{ color: 'text--3', padding: '2rem 1rem 1rem 2rem' }}>Item Name</TableCell>
                        <TableCell className={styles.tableHeadCell} align="right" sx={{ color: 'text--3', paddingTop: '2rem' }}>QTY.</TableCell>
                        <TableCell className={styles.tableHeadCell} align="right" sx={{ color: 'text--3', paddingTop: '2rem' }}>Price</TableCell>
                        <TableCell className={styles.tableHeadCell} align="right" sx={{ color: 'text--3', padding: '2rem 2rem 1rem 1rem' }}>Total</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody sx={{ display: { xs: 'table-row-group', sm: 'none' } }}>
                    {items.map((item, index) => {
                        const itemPrice = (item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        const itemTotal = (item.total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        
                        return (
                            <TableRow key={index}>
                                <TableCell align='left' sx={{ borderBottom: '0', padding: '1.5rem 1rem 1rem 1.5rem' }}>
                                    <Box>
                                        <Typography sx={{ color: 'text--1', fontWeight: 600, fontSize: '1.1rem' }}>{item.name}</Typography>
                                        <Typography sx={{ color: 'text--3', fontWeight: 600 }}>{item.quantity} x $ {itemPrice}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell className={styles.tableBodyCell} align='right' sx={{ padding: '1.5rem 1.5rem 1rem 1rem', color: 'text--1', fontSize: '1.1rem' }}>$ {itemTotal}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>

                <TableBody sx={{ display: { xs: 'none', sm: 'table-row-group' } }}>
                    {items.map((item, index) => {
                        const itemPrice = (item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        const itemTotal = (item.total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        
                        return (
                            <TableRow key={index}>
                                <TableCell className={styles.tableBodyCell} align='left' sx={{ color: 'text--1', fontSize: '1.1rem', padding: '1rem 1rem 1rem 2rem' }}>{item.name}</TableCell>
                                <TableCell className={styles.tableBodyCell} align='right' sx={{ color: 'text--3' }}>{item.quantity}</TableCell>
                                <TableCell className={styles.tableBodyCell} align='right' sx={{ color: 'text--3' }}>$ {itemPrice}</TableCell>
                                <TableCell className={styles.tableBodyCell} align='right' sx={{ color: 'text--1', fontSize: '1.1rem', padding: '1rem 2rem 1rem 1rem' }}>$ {itemTotal}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}