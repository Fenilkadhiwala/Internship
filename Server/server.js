const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const Queue = require("bull");
const cookieParser = require("cookie-parser");
const { graphqlHTTP } = require("express-graphql");
// const schema = require("./Schema/schema");
// const { REDIS_PORT, REDIS_URI } = require("./redisCredentials");
const { REDIS_PORT, REDIS_URI } = require("./servers/redis/redisCredentials");

const ShopDb = require("./servers/model/model");

const ConnectDb = require("./servers/database/connection");
const router = require("./servers/routes/route");
// require("./processer/index");

const app = express();
app.use(cookieParser());
dotenv.config({
  path: "config.env",
});

app.use(
  bodyParser.json({
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/", router);

PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  ConnectDb();

  console.log(`http://localhost:${PORT}`);
});
