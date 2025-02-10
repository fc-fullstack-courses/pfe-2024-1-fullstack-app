import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Outlet } from 'react-router';
import styles from './MainLayout.module.scss';

const BasicLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BasicLayout;
