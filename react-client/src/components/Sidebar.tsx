import styles from './Sidebar.module.scss';

export interface SidebarProps {

}

export default function Sidebar(props: SidebarProps) {
  return (
    <div className={ styles.sidebar }>
      <nav className={ styles.sidebarNav }>
        <ul className={ styles.linkList }>
          <li>
            <a href="javascript: void(0)">My Books</a>
          </li>
          <li>
            <a href="javascript: void(0)">Authors</a>
          </li>
          <li>
            <a href="javascript: void(0)">Genres</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
