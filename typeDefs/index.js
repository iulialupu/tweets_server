const {buildSchema} = require("graphql");

module.exports = buildSchema(`
    type Tweet {
        _id: ID!
        text: String!
        createdAt: String!
        updatedAt: String!
    }

    input TweetInput {
        text: String!
    }

    type Query {
        tweets: [Tweet!]!
        tweet(id: ID): Tweet
    }

    type Mutation {
        createTweet(tweetInput: TweetInput) : Tweet!
        updateTweet(id: ID, tweetInput: TweetInput) : Tweet!
        deleteTweet(id: ID) : ID
    }

    schema {
        query: Query
        mutation: Mutation
    }
`)