import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { UserContext } from '../../../contexts';

const PublicOnlyRoute = () => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  if (!user) {
    return <Outlet />;
  }
};

export default PublicOnlyRoute;
