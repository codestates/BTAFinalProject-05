const express = require('express');
const cors = require('cors');
const YAML = require('yamljs');
const path = require('path');
// const swaggerUi = require('swaggerUi');
import {serve, setup} from 'swagger-ui-express'

import indexRouter from "../route/index";
import apiRouter from "../route/api";
import { notFoundErrorHandler, errorHandler}  from '../middleware/apiErrorHandler';

const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit:"50mb", extended:false}));

app.use("/", indexRouter);
app.use("/api", apiRouter);

console.log("Swagger On : /api-docs");
const swaggerSpec = YAML.load(path.join(__dirname, '../../dist/swagger.yaml'));
const options = {swaggerOptions: { docExpansion : "none"}}
app.use('/api-docs', serve, setup(swaggerSpec, options))

app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;
