import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import userRoutes from './routes/userRoutes';
import personRoutes from './routes/personRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Purnata server running');
});
app.use('/api/users', userRoutes);
app.use('/api/persons', personRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI!)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));
