const saltRound = 10;
const jwt = require("jsonwebtoken");

const accessSecretKey =
  "4dfa612e335f1c258faf55a867c5ac12b77934d1938e1410ab0241b960872f02";
const refreshSecretKey =
  "7bcef4e5b4a91ddc7afdcc31af961a61e2ba827f060ac00c3510b41e9cefd78f";

const createTokens = (wholeId) => {
  console.log("Creating Tokens With Uniq Id", wholeId);

  const accessToken = jwt.sign({ wholeId }, accessSecretKey, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ wholeId }, refreshSecretKey, {
    expiresIn: "7d",
  });

  console.log("ACCESS TOKEN", accessToken);
  console.log();
  console.log("REFRESH TOKEN", refreshToken);

  return { accessToken, refreshToken };
};

module.exports = createTokens;
