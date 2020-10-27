const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

// const schema = require("./schema/schema");
const schema = require("./typeDefs");
const graphqlResolver = require("./resolvers");
const { MONGO_URI } = require("./config");
const auth = require("./middleware/auth");

mongoose.set("useCreateIndex", true);

const app = express();

// app.use(bodyParser.json());

app.use(cors());

// app.use((req, res, next) => {
//   console.log(req);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(auth);

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
    // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@tweets.v8opz.mongodb.net/tweets?retryWrites=true&w=majority`,
    MONGO_URI,
    {
      useNewUrlParser: true,
      keepAlive: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(4000, () => {
      console.log("Server started");
    });
  })
  .catch((err) => console.log(err));
