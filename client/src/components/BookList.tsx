import './BookList.css';
import { useQuery } from '@apollo/client';
import { getBooksQuery, BooksQueryData } from 'src/queries/get-books-query';
import BookDetails from './BookDetails';
import { useState } from 'react';

export default function BookList() {

  const { loading, error, data } = useQuery<BooksQueryData>(getBooksQuery);
  const [currentBookId, setCurrentBookId] = useState<string>();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <></>;

  // console.log('[client] data', data);

  const displayedBooks = data.books.map((book) => (
    <li className="book-card" key={ book.id } onClick={ () => setCurrentBookId(book.id) }>
      <div className="h5 mt-0">{ book.name }</div>
      <div className="book-subtitle">{ book.author.name }</div>
    </li>
  ));

  return (
    <div>
      <ul className="book-list">{displayedBooks}</ul>
      { currentBookId && <BookDetails bookId={currentBookId}></BookDetails> }
    </div>
  );
}
