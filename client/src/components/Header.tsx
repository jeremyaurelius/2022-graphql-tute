import styles from './Header.module.scss';

export interface HeaderProps {
}

export default function Header(props: HeaderProps) {
  return (
    <header className={`${styles.header} ${styles.hasSidebar}`}>
      <nav className={ styles.headerContents }>
        <div className={`${styles.headerTitle} h2`}>
          <a href="javascript: void(0)">Book Club</a>
        </div>
        <ul className={ styles.linkList }>
          <li>
            <a href="javascript: void(0)">Stuff</a>
          </li>
          <li>
            <a href="javascript: void(0)">Stuff 2</a>
          </li>
          <li>
            <a href="javascript: void(0)">Stuff 3</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
