import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import { authRouter, bookRouter } from './routes/index.js';
import cronJob from './lib/cron.js';

const PORT = process.env.PORT || 3000;
const app = express();

cronJob.start();

app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
