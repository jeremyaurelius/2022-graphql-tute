import './BookList.css';
import { useQuery } from '@apollo/client';
import { BookQueryResult, getBooksQuery } from 'src/queries/queries';

export default function BookList() {

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // console.log('[client] data', data);

  const displayedBooks = data.books.map((book: BookQueryResult) => (
    <li className="book-card" key={book.id}>
      <div className="h5 mt-0">{ book.name }</div>
      <div className="book-subtitle">{ book.author.name }</div>
    </li>
  ));

  return (
    <div>
      <ul className="book-list">{displayedBooks}</ul>
    </div>
  );
}
