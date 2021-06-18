import express = require('express');
const app = express();
import morgan = require('morgan');
import mongoose = require('mongoose');
import cors = require('cors');
require('dotenv/config');
import authJwt = require('./app/helpers/jwt');
import errorHandler = require('./app/helpers/error-handler');

//Routes
import categoriesRoutes = require('./app/routes/categories');
import productsRoutes = require('./app/routes/products');
import usersRoutes = require('./app/routes/users');
import ordersRoutes = require('./app/routes/orders');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/assets/uploads', express.static(__dirname + '/assets/uploads'));
app.use(errorHandler);

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

// Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
