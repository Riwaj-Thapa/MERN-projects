import express from 'express';
import dotenv from 'dotenv'
import storyRoute from './routes/storyRoute.js';
import cors from 'cors';
import path from 'path';
import connectDb from './config/dbConnection.js';
import { fileURLToPath } from 'url';

const app = express();
// Load environment variables from .env file
dotenv.config();

// For database connection.
connectDb();

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For port selection.
const port = process.env.PORT || 8008;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/stories', storyRoute);



app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
