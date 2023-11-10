
import express from 'express';
import cors from 'cors';
import authrouter from './routes/app-users.js';
import connectToDb from './db-utils/mongodb_connection.js';
import jwt from 'jsonwebtoken';

const app = express();

const PORT = process.env.PORT || 5050;

// Top/Global Level await
await connectToDb();

app.use(express.static('public'));

app.use(cors());
const authMiddleware = (req, res, next) => {
    const authToken = req.headers['auth-token'];
    try {
      jwt.verify(authToken, process.env.JWT_SECRET);
      next();
    } catch (e) {
      console.error('## Error Occured ##', e);
      res.status(401).send({ msg: 'Unauthorized' });
    }
  }
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authrouter);
app.listen(5050,()=>{console.log("successfully port is running")});