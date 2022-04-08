import './BookDetails.css';
import { useQuery } from '@apollo/client';
import { BookDetailsQueryData, getBookDetailsQuery } from 'src/queries/get-book-details-query';

export interface BookDetailsProps {
  bookId: string;
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

  if (book) {
    return (
      <div>
        <h2>{ book.name }</h2>
        <p>{ book.genre }</p>
        <p>{ book.author.name }</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          { book.author.books.map(item => {
              return <li key={item.id}>{ item.name }</li>
          })}
        </ul>
      </div>
    );
  } else {
    return( <div>No book selected...</div> );
  }

}
