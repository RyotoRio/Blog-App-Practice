const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const connectMongodb = require("./init/mongodb");
const { authRoute, categoryRoute, fileRoute, postRoute } = require("./routes");
const { errorHandler } = require("./middlewares");
const notFound = require("./controllers/notFound");

//init app
const app = express();

// connect database
connectMongodb();

// 3rd party middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));

//route section
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);

//not found route
app.use("*", notFound);

//errorHandling middleware
app.use(errorHandler);

module.exports = app;
