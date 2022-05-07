import Invoice from "../models/invoice.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function getInvoice(req, res) {
    const { id } = req.params;

    try {
        const invoice = await Invoice.findById(id);

        res.json({ success: true, invoice: invoice });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to get invoice' });
    }
}

export async function getUserInvoices(req, res) {
    const { user } = req.params;

    try {
        const invoices = await Invoice.find({ created_by: user });

        res.json({ success: true, invoices: invoices });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to get invoices' });
    }
}

export async function createInvoice(req, res) {
    try {
        const invoice = new Invoice(req.body);

        await invoice.save();

        console.log(`Creating invoice: ${invoice}`);

        res.json({ success: true, msg: 'Successfully created invoice' });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to create invoice' });
    }
}

export async function updateInvoice(req, res) {
    const { id } = req.params;
    const { user } = req;

    //console.log('update invoice user: ', user)

    try {
        const invoice = await Invoice.findById(id);

        if(user.username !== invoice.created_by) {
            return res.json({ success: false, msg: 'You are not authorized to edit this invoice' });
        }
        
        await Invoice.findByIdAndUpdate(id, req.body);        

        res.json({ success: true, msg: 'Successfully updated invoice' });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to update invoice' });
    }
}

export async function deleteInvoice(req, res) {
    const { id } = req.params;
    const { user } = req;

    try {
        const invoice = await Invoice.findById(id);

        if(user.username !== invoice.created_by) {
            return res.json({ success: false, msg: 'You are not authorized to delete this invoice' });
        }

        await Invoice.findByIdAndDelete(id);
        
        res.json({ success: true, msg: 'Successfully deleted invoice' });
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to delete invoice' });
    }
}