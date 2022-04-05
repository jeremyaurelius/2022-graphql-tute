const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const passwordPrompt = require('password-prompt');

const app = express();

// connect to MongoDB database

passwordPrompt('password: ').then((password) => {
  mongoose.connect(`mongodb+srv://jeraurelius:${password}@cluster0.kn98l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
  mongoose.connection.once('open', () => {
    console.log('[server/app] connected to DB');
  });
});

// let graphqlHTTP middleware handle routes of /graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // enable GraphiQL on that route
}));

app.listen(4000, () => {
  console.log('[server/app] now listening for requests on port 4000');
});
