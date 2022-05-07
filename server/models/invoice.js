import mongoose from 'mongoose';

const invoiceSchema = mongoose.Schema({
    clientName: String,
    clientEmail: String,
    description: String,
    status: {
        type: String,
        default: 'Pending'
    },
    clientAddress: {
        street: String,
        city: String,
        postCode: String,
        country: String
    },
    senderAddress: {
        street: String,
        city: String,
        postCode: String,
        country: String
    },
    paymentTerm: {
        type: Number, 
        default: 1
    },
    items: [
        {
            name: String,
            quantity: { 
                type: Number, 
                default: 1 
            },
            price: { 
                type: Number, 
                default: 0.00 
            },
            total: { 
                type: Number, 
                default: 0.00 
            }
        }
    ],
    total: {
        type: Number,
        default: 0.00
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    paymentDue: Date,
    created_by: {
        type: String,
        required: true
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;