import { useQuery } from '@apollo/client';
import { getBooksQuery, BooksQueryData } from 'src/queries/get-books-query';
import BookDetails from './BookDetails';
import { useState } from 'react';
import AddBookForm from './AddBookForm';
import BookList from './BookList';

export interface BooksPageProps {
}

export default function BooksPage(props: BooksPageProps) {

  const { loading, error, data } = useQuery<BooksQueryData>(getBooksQuery);
  const [currentBookId, setCurrentBookId] = useState<string>();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <></>;

  // console.log('[client] data', data);

  return (
    <>
      <div className="page-header">
        <div className="page-header-contents">
          <h1 className="page-header-title mt-0 mb-0">My Books</h1>
        </div>
      </div>
      <div className="page-body">
        { currentBookId && <BookDetails bookId={currentBookId} onBookClick={ setCurrentBookId }></BookDetails> }
        <div className="page-section">
          <h2>All Books</h2>
          <BookList books={ data.books } onBookClick={ setCurrentBookId }></BookList>
        </div>
        {/* <div className="page-section"> */}
        <AddBookForm></AddBookForm>
        {/* </div> */}
      </div>
    </>
  );
}
