const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
// const schema = require("./schema/schema");
const schema = require("./typeDefs");
const graphqlResolver = require("./resolvers")

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: graphqlResolver,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@tweets.v8opz.mongodb.net/tweets?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      keepAlive: true,
      useFindAndModify: false,
       useUnifiedTopology: true 
    }
  )
  .then((result) => {
    app.listen(4000, () => {
      console.log("Server started");
    });
  })
  .catch((err) => console.log(err));
