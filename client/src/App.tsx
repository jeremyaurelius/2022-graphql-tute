import './App.css';
import BookList from './components/BookList';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // this needs to be based on the environment
  cache: new InMemoryCache(),
});

// client.query({
//   query: gql(`
//     {
//       books {
//         name
//         id
//       }
//     }
//   `),
// }).then((result) => {
//   console.log('[client] result', result);
// }).catch((e) => {
//   console.log('e', e);
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Reading List</h1>
        <BookList></BookList>
      </div>
    </ApolloProvider>
  );
}

export default App;
