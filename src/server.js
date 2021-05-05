require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { connect } = require('./db');

const port = process.env.PORT;
const app = express();
connect();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
