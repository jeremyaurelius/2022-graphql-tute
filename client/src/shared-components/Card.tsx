import './Card.css';

export interface CardProps {
  onCardClick?: (e: React.MouseEvent) => void;
  title: string;
  subtitle: string;
}

export default function Card(props: CardProps) {
  const isClickable = !!props.onCardClick;
  return <div className={`card ${isClickable ? 'is-clickable' : ''}`} onClick={ (e) => props.onCardClick && props.onCardClick(e) }>
    <div className="h5 mt-0">{ props.title }</div>
    <div className="card-subtitle">{ props.subtitle }</div>
  </div>;
}
