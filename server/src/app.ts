/* eslint-disable no-console */
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const host = 'localhost';
const port = 3000;

const dataBaseConnection = mysql.createConnection({
  host,
  user: 'my_admin',
  password: ''
});

dataBaseConnection.connect((err) => {
  if (err) throw err;
  dataBaseConnection.query(
    'CREATE DATABASE IF NOT EXISTS my_development_space;',
    (DBError, result) => {
      if (DBError) throw DBError;
      console.log('Connected!', result);
    }
  );
});

app.use(
  cors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, OPTIONS'
    // allowedHeaders:
    //   "Origin, X-Requested-With, Content-Type, Accept, Cache-Control",
  })
);

app.get('/user/auth', (req, res) => {
  console.log('Connected!', req, res);
});

app.post('/user/auth', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
