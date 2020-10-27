const Tweet = require("../models/tweet");

module.exports = {
  tweets: async () => {
    try {
      const tweets = await Tweet.find();
      return tweets;
    } catch (error) {
      console.log(error);
    }
  },

  tweet: async ({ id }) => {
    try {
      const tweet = await Tweet.findById(id);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  },

  createTweet: async ({ tweetInput }, req) => {
    try {
      if (!require.isAuth) throw new Error("Not authenticated!");
      const userId = req.user.id;
      const tweet = await Tweet.create({ ...tweetInput, user: userId });
      return tweet;
    } catch (error) {
      console.log(error);
    }
  },

  updateTweet: async ({ id, tweetInput }, req) => {
    try {
      if (!require.isAuth) throw new Error("Not authenticated!");
      const tweet = await Tweet.findById(id);
      console.log(tweet, req.user);
      if (tweet.user.toString() !== req.user.id.toString())
        throw new Error("You are not allowed to edit this tweet!");
      const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetInput, {
        new: true,
      });
      return updatedTweet;
    } catch (error) {
      console.log(error);
    }
  },

  deleteTweet: async ({ id }, req) => {
    try {
      if (!require.isAuth) throw new Error("Not authenticated!");
      const tweet = await Tweet.findById(id);
      console.log(tweet, req.user);
      if (tweet.user.toString() !== req.user.id.toString())
        throw new Error("You are not allowed to delete this tweet!");
      await Tweet.findByIdAndDelete(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  },
};
