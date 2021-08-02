import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv, { config } from 'dotenv'
import postRoutes from './routes/posts.js';
//config Express App
const app = express();

//config Env variables
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// config routes
// post route
app.use('/posts', postRoutes);

// route for checking API is running or not 
app.get('/', (req, res) => {
  res.send('API is running')
})
// MongoDB connection URL
const CONNECTION_URL = process.env.CONNECTION_URL;

//config PORT
const PORT = process.env.PORT || 5000

// setting up connection to mongodb and start sever
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);