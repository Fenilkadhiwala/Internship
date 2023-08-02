const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const ConnectDb = require("./servers/database/connection");
const router = require("./servers/routes/route");
 
const app = express();

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
