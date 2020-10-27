const tweetResolvers = require("./tweets");
const userResolvers = require("./users");

module.exports = {
  ...tweetResolvers,
  ...userResolvers,
};
