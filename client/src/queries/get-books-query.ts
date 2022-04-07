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
