import express from 'express';
import userRoutes from './routes/userRoutes';
import tweetRoutes from './routes/tweetRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middlewares/authMiddleware';

const app = express();
const cors = require('cors')
app.use(express.json());
app.use('/user', authenticateToken, userRoutes);
app.use('/tweet', authenticateToken, tweetRoutes);
app.use('/auth', authRoutes);
app.use(cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

app.get('/', (req, res) => {
  res.send('Hello "updated" world!');
});

app.listen(3000, () => {
  console.log('Server ready at localhost:3000');
});
