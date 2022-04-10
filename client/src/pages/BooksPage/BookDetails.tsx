import styles from './BookDetails.module.scss';
import { useQuery } from '@apollo/client';
import { BookDetailsQueryData, getBookDetailsQuery } from 'src/queries/get-book-details-query';
import BookList from './BookList';
import Badge from 'src/shared-components/Badge';

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
    <div className="page-section">
      <h2>{ book.name }</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <div className={ styles.bookBadges }>
        <Badge text={ book.author.name }></Badge>
        { book.genre ? <Badge text={ book.genre }></Badge> : null }
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
