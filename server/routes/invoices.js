import express from 'express';
import { createInvoice, deleteInvoice, getInvoice, getUserInvoices, updateInvoice } from '../controllers/invoices.js';
import { validateToken } from '../middleware/validateToken.js';

const router = express.Router();

router.get('/:id', getInvoice);

router.get('/user/:user', getUserInvoices);

router.post('/', createInvoice);

router.patch('/:id', validateToken, updateInvoice);

router.delete('/:id', validateToken, deleteInvoice);

export default router;