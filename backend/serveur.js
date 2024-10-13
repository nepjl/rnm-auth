import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoutes.js';

const port = process.env.PORT || 3000;
dotenv.config()


const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);

app.listen(port, () => {`Le serveur écoute bien sur le port ${port}`})