import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import userRoutes from './routes/users.js';
import invoiceRoutes from './routes/invoices.js';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/invoices', invoiceRoutes);

app.use('/', (req, res) => {
    res.json('APP IS RUNNING');
});


mongoose
    .connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port: ${PORT}`);
        })
    })
    .catch(err => console.log(err));
