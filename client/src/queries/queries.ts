import { Book } from 'src/models/book';
import { gql } from '@apollo/client';
import { Author } from 'src/models/author';

export const getBooksQuery = gql`
  {
    books {
      name
      id
      author {
        name
      }
    }
  }
`;

export type BookQueryResult = Pick<Book, 'name' | 'id'> & {
  author: Pick<Author, 'name' | 'id'>
};

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export type AuthorQueryResult = Pick<Author, 'name' | 'id'>;

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
