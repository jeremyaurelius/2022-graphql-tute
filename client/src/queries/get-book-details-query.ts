import { Book } from 'src/models/book';
import { gql } from '@apollo/client';
import { Author } from 'src/models/author';
import { BookQueryItem } from './get-books-query';

export const getBookDetailsQuery = gql`
  query GetBookDetails($id: ID!) {
    book(id: $id) {
      name
      genre
      id
      author {
        id
        name
        age
        books {
          name
          id
          author {
            name
          }
        }
      }
    }
  }
`;

export interface BookDetailsQueryData {
  book: BookDetailsQueryItem;
}

export type BookDetailsQueryItem = Book & {
  author: Pick<Author, 'name' | 'id'> & {
    books: BookQueryItem[];
  }
}
