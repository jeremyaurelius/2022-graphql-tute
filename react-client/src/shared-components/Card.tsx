import styles from './Card.module.scss';

export interface CardProps {
  onCardClick?: (e: React.MouseEvent) => void;
  title: any;
  subtitle: string;
}

export default function Card(props: CardProps) {
  const isClickable = !!props.onCardClick;
  return <div className={`${styles.card} ${isClickable ? styles.isClickable : ''}`} onClick={ (e) => props.onCardClick && props.onCardClick(e) }>
    <div className="h5 mt-0">{ props.title }</div>
    <div className={ styles.subtitle }>{ props.subtitle }</div>
  </div>;
}
