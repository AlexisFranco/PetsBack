require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { connect } = require('./db');

const clientRouter = require('./routes/client');
const walkerRouter =  require('./routes/walker');
const petRouter = require('./routes/pet');
const medicineRouter = require('./routes/medicine');
const serviceRouter = require('./routes/service');
const typeMedicationRouter = require('./routes/typeMedication');

const port = process.env.PORT;
const app = express();
connect();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

app.use('/clients', clientRouter);
app.use('/walkers', walkerRouter);
app.use('/pets', petRouter);
app.use('/medicines', medicineRouter);
app.use('/services', serviceRouter);
app.use('/types', typeMedicationRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
