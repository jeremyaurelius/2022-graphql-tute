import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import BooksPage from './pages/BooksPage/BooksPage';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // this needs to be based on the environment
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      {/* TODO: add routing here */}
      <BooksPage></BooksPage>
    </ApolloProvider>
  );
}
