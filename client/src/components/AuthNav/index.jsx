import { NavLink, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AuthNav.module.scss';
import { logout } from '../../store/slices/userSlice'; 

const setActive = ({ isActive }) =>
  isActive ? styles.activeLink : styles.link;

const AuthNav = () => {
  const location = useLocation();
  const {user, isLoading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isAuthPage = location.pathname.includes('auth');
  const isLoginPage = location.pathname.includes('login');

  const authLinks = (
    <NavLink
      to={`/auth/${isLoginPage ? 'registration' : 'login'}`}
      className={setActive}
    >
      {isLoginPage ? 'Registration' : 'Login'}
    </NavLink>
  );

  const guestLinks = (
    <>
      <NavLink to='/auth/login' className={setActive}>
        Login
      </NavLink>
      <NavLink to='/auth/registration' className={setActive}>
        Register
      </NavLink>
    </>
  );

  const logoutBtn = <button onClick={() => {
    dispatch(logout());
  }}>Logout</button>

  return (
    <div className={styles.container}>
      {user ? logoutBtn : isAuthPage ? authLinks : guestLinks}
    </div>
  );
};

export default AuthNav;
