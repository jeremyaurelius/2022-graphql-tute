import { BookQueryItem } from 'src/queries/get-books-query';
import Card from 'src/shared-components/Card';

export interface BookCardProps {
  book: BookQueryItem;
  onBookClick?: (id: string) => void;
}

export default function BookCard(props: BookCardProps) {
  const { book, onBookClick } = props;
  const onCardClick = onBookClick ? () => onBookClick(book.id) : void(0);
  return (
    <Card onCardClick={onCardClick} title={ book.name } subtitle={ book.author.name }></Card>
  );
}
