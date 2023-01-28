const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const printRoutes = require('./routes/printRoutes');
const path = require('path');
const parser = require('body-parser');

app.use(parser.json());

dotenv.config();

app.use('/user', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/print', printRoutes);
app.use('/files', express.static(path.join(__dirname, 'files')));

app.listen(process.env.PORT, () => {
    console.log("The server is running at " + process.env.PORT);
})






