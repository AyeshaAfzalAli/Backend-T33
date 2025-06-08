import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import adminRoutes from './routes/adminRoutes';
import volunteerRoutes from './routes/volunteerRoute';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Purnata server running');
});
app.use('/api/admin', adminRoutes);
app.use('/api/volunteer', volunteerRoutes);

const PORT = 5000;
const link = "mongodb://localhost:27017/purnata-db";
mongoose.connect(link)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));
