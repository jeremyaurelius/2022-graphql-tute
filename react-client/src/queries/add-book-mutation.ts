import { gql } from '@apollo/client';

export const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;
