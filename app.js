const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Tentar estabelecer conexão com banco de dados
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://barbara:Babi123456@cluster0.h7pshti.mongodb.net/t2-backend?retryWrites=true&w=majority"
  )
  .then(() => {
    // Conexão estabelecida com sucesso
    console.log("Conexão estabelecida com sucesso");
  })
  .catch((error) => {
    console.log("Não foi possível conectar com o banco de dados. Abortando.");
    exit(1);
  });

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { exit } = require("process");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
