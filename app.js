const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const printRoutes = require('./routes/printRoutes');
const path = require('path');
const parser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerExpress = require('swagger-ui-express');

app.use(parser.json());

dotenv.config();

app.use('/user', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/print', printRoutes);
app.use('/files', express.static(path.join(__dirname, 'files')));


const option = {
    definition : {
        openapi : '3.0.0',
        info : {
            title: "PRINT IT",
            description: "This is the complete live Documentation for the Print IT API and will be updated whenever there are any changes in the API",
            version : '1.0.0',
        },
        servers : [
            {
                url : "localhost:3000" 
            }
        ]
    },
    apis: [
        'routes/printRoutes.js',
        'routes/userRoutes.js',
        'routes/vendorRoutes.js'
    ]
}

const swaggerSpec = swaggerJsDoc(option);

app.use('/api/docs', swaggerExpress.serve, swaggerExpress.setup(swaggerSpec))


app.listen(process.env.PORT, () => {
    console.log("The server is running at " + process.env.PORT);
})