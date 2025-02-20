import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { connect } from 'react-redux';
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

function App({user, dispatch}) {
  // const [user, setUser] = useState(null);

  const setUser = (user) => {
    dispatch(userAuthSuccess(user));
  } 

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

const mStP = (state) => ({
  ...state.user,
});

const withProps = connect(mStP);

const AppWithProps = withProps(App);

export default AppWithProps;
