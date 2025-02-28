import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
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
import CONSTANTS from './constants';
import PrivateRoute from './components/Routes/PrivateRoute';
import CounterPage from './pages/CounterPage';
import PublicOnlyRoute from './components/Routes/PublicOnlyRoute';
import { refresh } from './store/slices/userSlice';
import ChatPage from './pages/ChatsPage';

function App() {
  const { user, isLoading, error } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  
  useEffect(() => {
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN_KEY);

    if (refreshToken) {
      dispatch(refresh(refreshToken));
    }
  }, []);

  return (
    <UserContext.Provider value={[user]}>
      <Routes>
        <Route path='/' element={<BasicLayout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/counter' element={<CounterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<UserProfilePage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path="/chats/*" element={<ChatPage />} />
          </Route>
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route element={<PublicOnlyRoute />}>
            <Route path='login' element={<LoginPage />} />
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
