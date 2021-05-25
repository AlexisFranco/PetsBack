require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { connect } = require('./db');

const petRouter = require('./routes/pet');
const userRouter = require('./routes/user')
const zoneRouter = require('./routes/zone');
const clientRouter = require('./routes/client');
const walkerRouter =  require('./routes/walker');
const serviceRouter = require('./routes/service');
const medicineRouter = require('./routes/medicine');
const typeMedicationRouter = require('./routes/typeMedication');

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

app.use('/pets', petRouter);
app.use('/users', userRouter);
app.use('/zones', zoneRouter);
app.use('/clients', clientRouter);
app.use('/walkers', walkerRouter);
app.use('/services', serviceRouter);
app.use('/medicines', medicineRouter);
app.use('/types', typeMedicationRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
