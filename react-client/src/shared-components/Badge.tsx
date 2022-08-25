import './Badge.css';

export interface BadgeProps {
  // onBadgeClick?: (e: React.MouseEvent) => void;
  text: string;
}

export default function Badge(props: BadgeProps) {
  // const isClickable = !!props.onBadgeClick;
  return <span className="book-details-badge">{ props.text }</span>;
}
