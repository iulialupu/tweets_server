const Tweet  = require("../models/tweet")


module.exports = {
    tweets: async () => {
        try{
            const tweets = await Tweet.find();
            console.log(tweets)
            return tweets;
        }
        catch(error) {
            console.log(error)
        }
    },

    tweet: async ({id}) => {
        try{
            const tweet = await Tweet.findById(id);
            console.log(tweet)
            return tweet;
        }
        catch(error) {
            console.log(error)
        }
    },

    createTweet: async ({tweetInput}) => {
        try{
            const tweet = await Tweet.create(tweetInput);
            console.log(tweet)
            return tweet;
        }
        catch(error) {
            console.log(error)
        }
    },

    updateTweet: async ({id, tweetInput}) => {
        try{
            const tweet = await Tweet.findByIdAndUpdate(id, tweetInput, {new: true});
            console.log(tweet)
            return tweet;
        }
        catch(error) {
            console.log(error)
        }
    },

    deleteTweet: async ({id}) => {
        try{
            await Tweet.findByIdAndDelete(id);
            return id;
        }
        catch(error) {
            console.log(error)
        }
    },
}