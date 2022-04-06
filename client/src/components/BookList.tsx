import './BookList.css';
import { gql, useQuery } from '@apollo/client';
import { Book } from '../models/book';

const getBooksQuery = gql(`
  {
    books {
      name
      id
    }
  }
`);

type BookQueryResult = Pick<Book, 'name' | 'id'>;

export default function BookList() {

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log('[client] data', data);

  const books = data.books.map((book: BookQueryResult) => (
    <li key={book.id}>
      {book.name}
    </li>
  ));

  return (
    <div>
      <ul className="book-list">{books}</ul>
    </div>
  );
}
