import { gql } from '@apollo/client';
import { Author } from 'src/models/author';

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export type AuthorQueryResult = Pick<Author, 'name' | 'id'>;
