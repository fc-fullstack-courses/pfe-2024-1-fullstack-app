import { NavLink } from 'react-router';
import styles from './Navigation.module.scss';

const setActive = ({ isActive }) =>
  isActive ? styles.activeLink : styles.link;

function Navigation() {
  return (
    <nav>
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <NavLink to="/" className={setActive}>
            Home
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/about" className={setActive}>
            About me
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/profile" className={setActive}>
            Profile
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/users" className={setActive}>
            Users
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/counter" className={setActive}>
            Counter
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink to="/chats" className={setActive}>
            Chats
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
