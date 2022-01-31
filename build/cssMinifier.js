const CleanCSS = require("clean-css");

module.exports = (code) => {
  if (process.env.ENV === "production") {
    return new CleanCSS({}).minify(code).styles;
  }
  return code;
};