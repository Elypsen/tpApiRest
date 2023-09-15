const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_output.json'
swaggerAutogen(outputFile, ['./routes/teamRouter', './routes/userRouter'])
const swaggerDocument = require('./swagger_output.json');
app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//connexion à la db
require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/userRouter");
const adminRouter = require("./routes/teamRouter");

app.use("/", router);
app.use("/team", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
