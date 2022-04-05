const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// let graphqlHTTP middleware handle routes of /graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // enable GraphiQL on that route
}));

app.listen(4000, () => {
  console.log('[server/app] now listening for requests on port 4000');
});
