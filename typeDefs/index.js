const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Comment {
        _id: ID!
        tweet: Tweet!
        text: String!
        user: User!
        likes: [User]
        createdAt: String!
        updatedAt: String!
    }

    type Tweet {
        _id: ID!
        text: String!
        user: User!
        comments: [Comment]
        likes: [User]
        createdAt: String!
        updatedAt: String!
    }

    input UserRegister {
        email: String!
        username: String!
        password: String!
    }

    input UserLogin {
        email: String!
        password: String
    }

    input TweetInput {
        text: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        tweets: [Tweet]
        followers: [User]
        following: [User]
        firstName: String
        lastName: String
        profileImageUrl: String
        backgroundImageUrl: String
        bio: String
        location: String
        website: String
        createdAt: String!
        updatedAt: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type Query {
        tweets: [Tweet!]!
        tweet(id: ID): Tweet
    }

    type Mutation {
        createTweet(tweetInput: TweetInput) : Tweet!
        updateTweet(id: ID, tweetInput: TweetInput) : Tweet!
        deleteTweet(id: ID) : ID
        registerUser(registerInput: UserRegister): AuthData
        loginUser(loginInput: UserLogin): AuthData
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
