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

export interface AuthorsQueryData {
  authors: AuthorsQueryItem[];
}

export type AuthorsQueryItem = Pick<Author, 'name' | 'id'>;
