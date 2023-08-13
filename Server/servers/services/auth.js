const jwt = require("jsonwebtoken");
const tokenFunc = require("./render");

// exports.returnTokens = () => {
//   console.log(tokenFunc.setCookieFunc());
// };
 
exports.verifyAuth = () => {
  console.log("called Auth");
//   console.log(tokenFunc.setCookieFunc());
  return true;
};
