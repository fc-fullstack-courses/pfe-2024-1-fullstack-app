import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../../constants';
import { changeTheme } from '../../store/slices/themeSlice';
import { userBtnClick } from '../../api/ws';

const { THEMES } = CONSTANTS;

const Home = () => {
  const currentTheme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const changeThemeHandler = ({target: {value}}) => {
    dispatch(changeTheme(value))
  }

  const themeOptions = Object.values(THEMES).map((theme) => (
    <option key={theme} value={theme}>
      {theme}
    </option>
  ));

  return (
    <div>
      <h1>Home</h1>
      <p>Current theme is {currentTheme}</p>
      <select value={currentTheme} onChange={changeThemeHandler}>{themeOptions}</select>
      <button onClick={() => userBtnClick(currentTheme)}>Send WS event</button>
    </div>
  );
};

export default Home;
