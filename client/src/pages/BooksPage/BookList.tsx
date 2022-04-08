import './BookList.css';
import BookCard from './BookCard';
import { BookQueryItem } from 'src/queries/get-books-query';

export interface BookListProps {
  books: BookQueryItem[];
  onBookClick?: (bookId: string) => void;
}

export default function BookList(props: BookListProps) {
  const { books, onBookClick } = props;
  return <div className="book-list">
    {
      books.map((book) => {
        return <BookCard key={book.id} book={book} onBookClick={onBookClick}></BookCard>
      })
    }
  </div>;
}
