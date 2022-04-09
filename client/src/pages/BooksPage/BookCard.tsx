import { BookQueryItem } from 'src/queries/get-books-query';
import Card from 'src/shared-components/Card';
import './BookCard.css';

export interface BookCardProps {
  book: BookQueryItem;
  onBookClick?: (id: string) => void;
}

export default function BookCard(props: BookCardProps) {
  const { book, onBookClick } = props;
  const onCardClick = onBookClick ? () => onBookClick(book.id) : void(0);
  return (
    <Card onCardClick={onCardClick} title={ book.name } subtitle={ book.author.name }></Card>
    // <li className={`book-card ${isClickable ? 'is-clickable' : ''}`} onClick={ () => onBookClick && onBookClick(book.id) }>
    //   <div className="h5 mt-0">{ book.name }</div>
    //   <div className="book-subtitle">{ book.author.name }</div>
    // </li>
  );
}
