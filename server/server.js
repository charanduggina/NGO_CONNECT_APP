const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

// connect to db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const ngoRoutes = require('./routes/ngo');
const donateRoutes = require('./routes/donate');
const braintreeRoutes = require('./routes/braintree');

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = 'development')) {
    app.use(cors({ origin: `http://localhost:3000` }));
}


// middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',ngoRoutes);
app.use('/api',donateRoutes);
app.use('/api',braintreeRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
