import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import AuthLayout from './Layouts/AuthLayout';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import BasicLayout from './Layouts/MainLayout';

function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<BasicLayout />} >
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          {/* '/auth/login */}
          <Route path='login' element={<LoginPage />} />
          {/* '/auth/registration */}
          <Route path='registration' element={<RegistrationPage />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
