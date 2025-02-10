import Header from '../../components/Header';
import { Outlet } from 'react-router';
import styles from './AuthLayout.module.scss';

const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
