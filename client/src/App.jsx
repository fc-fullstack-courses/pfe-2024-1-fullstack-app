import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/Home';
import About from './pages/About';
import AuthLayout from './Layouts/AuthLayout';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import BasicLayout from './Layouts/MainLayout';
import UserProfilePage from './pages/UserProfile';
import UsersPage from './pages/Users';
import { UserContext } from './contexts';
import { refreshSession } from './api';
import CONSTANTS from './constants';
import PrivateRoute from './components/Routes/PrivateRoute';
import CounterPage from './pages/CounterPage';
import PublicOnlyRoute from './components/Routes/PublicOnlyRoute';
import { userAuthSuccess } from './store/actions/actionCreators';

/*
  хуки  react-redux
    1. useSelector - аналог mapStateToProps, підписує компонент на частинки стану зі стори 
    2. useDispatch - повертає функцію dispatch
    3. useStore - повртає об'єкт стори
*/

function App() {
  // const [user, setUser] = useState(null);

  // useSelector приймає функцію-селектор
  // ця функція приймає стан зі стори і повертає будь-що
  // те що поветрає селектор поверається результатом useSelector-а
  // const user = useSelector((state) => {

  //   return state.user.user;
  // });

  const { user, isLoading, error } = useSelector((state) => {
    return state.user;
  });

  const count = useSelector((state) => {
    return state.counter.count;
  });

  console.log(count);

  // хук який повертає функцію dispatch
  const dispatch = useDispatch();

  /*
    функція, приймає об'єкт з action creatoram-и та dispatch
    та повертає об'єкт функцій яким закручено діспатч переаних action creator-сів
  */
  const { userAuthSuccess: setUser } = bindActionCreators(
    { userAuthSuccess },
    dispatch
  );

  // const setUser = (user) => {
  //   // dispatch(userAuthSuccess(user));
  // }

  useEffect(() => {
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY);

    if (refreshToken) {
      refreshSession(refreshToken).then((userFromServer) => {
        setUser(userFromServer);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Routes>
        <Route path='/' element={<BasicLayout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/counter' element={<CounterPage />} />

          {/* <Route element={<PrivateRoute roles={['admin']}/>}> */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<UserProfilePage />} />
            <Route path='/users' element={<UsersPage />} />
          </Route>
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route element={<PublicOnlyRoute />}>
            {/* '/auth/login */}
            <Route path='login' element={<LoginPage />} />
            {/* '/auth/registration */}
            <Route path='registration' element={<RegistrationPage />} />
          </Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

// const mStP = (state) => ({
//   ...state.user,
// });

// const withProps = connect(mStP);

// const AppWithProps = withProps(App);

export default App;
