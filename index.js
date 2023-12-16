const express = require("express");
const app = express();
const db = require("./database.js");
const md5 = require("md5");
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

var siteRouter = require('./routers/siteRouter');
var apiRouter = require('./routers/apiRouter');
const path = require("path");
const cookieParser = require("cookie-parser");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const HTTP_PORT = 8000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: '1.0.0',
        },
    },
    apis: ["routers/apiRouter.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', siteRouter);
app.use('/api', apiRouter);

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});
