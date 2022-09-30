const htmlMinifier = require("./build/htmlMinifier");
const cssMinifier = require("./build/cssMinifier");
const jsMinifier = require("./build/jsMinifier");
const faviconPlugin = require("eleventy-favicon");

module.exports = function(eleventyConfig) {
  // favicon
  eleventyConfig.addPlugin(faviconPlugin);

  // minify js
  eleventyConfig.addNunjucksAsyncFilter("jsmin", jsMinifier);
  // minify css
  eleventyConfig.addFilter("cssmin", cssMinifier);
  // minify html
  eleventyConfig.addPlugin(htmlMinifier);

  // Add sort filter
  function sortByOrder(values) {
    let vals = [...values]
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order))
  }
  eleventyConfig.addFilter('sortByOrder', sortByOrder);

  // passthrough
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addPassthroughCopy('src/script')
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/font')
  eleventyConfig.addPassthroughCopy('src/.htaccess')

  return {
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  }
}
