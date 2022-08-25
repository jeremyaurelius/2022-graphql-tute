import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Sidebar from "./components/Sidebar";
import BooksPage from './pages/BooksPage/BooksPage';
import styles from './App.module.scss';
import Header from "./components/Header";
import { useEffect, useState } from "react";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // this needs to be based on the environment
  cache: new InMemoryCache(),
});

export default function App() {

  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    showBottomBanner: false,
  });

  useEffect(() => {
    document.title = 'Book Club';
  }, []);

  return (
    <ApolloProvider client={client}>
      <Header></Header>
      <div className={ styles.mainFrame }>
        <Sidebar></Sidebar>
        {/* TODO: add routing here */}
        <BooksPage setLayoutSettings={ setLayoutSettings }></BooksPage>
      </div>
    </ApolloProvider>
  );
}

export interface LayoutSettings {
  showBottomBanner: boolean;
}
