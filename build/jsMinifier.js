const { minify } = require("terser");

module.exports = async (code, callback) => {
  if (process.env.ENV === "production") {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  } else {
    callback(null, code);
  }
}