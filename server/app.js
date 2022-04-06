const processArgs = require('minimist')(process.argv.slice(2));
const storage = processArgs.storage === 'mem' ? 'mem' : 'mongo-db';

console.log('[server/app] processArgs', processArgs);

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = storage === 'mem' ? require('./schema/schema-mem-storage') : require('./schema/schema');
const passwordPrompt = require('password-prompt');

const app = express();

// connect to MongoDB database

if (storage === 'mongo-db') {
  passwordPrompt('password: ').then((password) => {
    mongoose.connect(`mongodb+srv://jeraurelius:${password}@cluster0.kn98l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
    mongoose.connection.once('open', () => {
      console.log('[server/app] connected to DB');
    });
  });
}

// let graphqlHTTP middleware handle routes of /graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // enable GraphiQL on that route
}));

app.listen(4000, () => {
  console.log('[server/app] now listening for requests on port 4000');
});
