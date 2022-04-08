import './BookDetails.css';
import { useQuery } from '@apollo/client';
import { BookDetailsQueryData, getBookDetailsQuery } from 'src/queries/get-book-details-query';
import BookList from './BookList';

export interface BookDetailsProps {
  bookId: string;
  onBookClick: (bookId: string) => void;
}

export default function BookDetails(props: BookDetailsProps) {

  const { loading, error, data } = useQuery<BookDetailsQueryData>(getBookDetailsQuery, {
    variables: { id: props.bookId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <></>;

  console.log('[client/BookDetails] data', data);

  const { book } = data;

  const otherBooks = book.author.books.filter(b => b.id !== book.id);

  return (
    <div className="page-section book-details">
      <h2>{ book.name }</h2>
      <div className="book-details-tags">
        <span className="book-details-tag book-details-tag-bordered">{ book.author.name }</span>
        { book.genre ? <span className="book-details-tag book-details-tag-bordered">{ book.genre }</span> : null }
      </div>
      {
        otherBooks.length ? <div className="page-subsection">
          <h3 className="mt-3">Other Books by this Author</h3>
          <BookList books={ otherBooks } onBookClick={ props.onBookClick }></BookList>
        </div> : null
      }
    </div>
  );

}
