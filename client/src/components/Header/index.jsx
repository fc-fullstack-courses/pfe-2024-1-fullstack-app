import AuthNav from '../AuthNav';
import Navigation from '../Navigation';
import s from './Header.module.scss';

function Header() {
  return (
    <header className={s.header}>
      <h1 className={s.heading}>Heading</h1>
      <div  className={s.navContainer}>
        <Navigation />
        <AuthNav />
      </div>
    </header>
  );
}

export default Header;
