import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router';
import { UserContext } from '../../../contexts';

const PrivateRoute = ({ roles }) => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user && roles?.length && !roles.includes(user.role))) {
      navigate('/');
    }
  });

  if (user) {
    return <Outlet />;
  }
};

PrivateRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
