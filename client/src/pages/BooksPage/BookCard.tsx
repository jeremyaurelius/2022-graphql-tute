import { BookQueryItem } from 'src/queries/get-books-query';
import './BookCard.css';

export interface BookCardProps {
  book: BookQueryItem;
  onBookClick?: (id: string) => void;
}

export default function BookCard(props: BookCardProps) {
  const { book, onBookClick } = props;
  const isClickable = !!onBookClick;
  return (
    <li className={`book-card ${isClickable ? 'is-clickable' : ''}`} onClick={ () => onBookClick && onBookClick(book.id) }>
      <div className="h5 mt-0">{ book.name }</div>
      <div className="book-subtitle">{ book.author.name }</div>
    </li>
  );
}
