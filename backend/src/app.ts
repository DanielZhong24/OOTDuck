import express from 'express';
import type { Application, Request, Response } from 'express';
import clothesRoutes from './routes/clothes.route.js';
import usersRoutes from './routes/user.route.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();
const frontEnd = process.env.FRONT_END_URL as string;
const aiConnection = process.env.MODEL_CONNECTION as string;

const allowedOrigins = [frontEnd, aiConnection];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/img', express.static(path.join(__dirname, 'img')));

app.use('/api/clothes', clothesRoutes);

app.use('/api/users', usersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the!');
});

export default app;
