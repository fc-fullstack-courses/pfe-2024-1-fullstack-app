import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import styles from './UserProfile .module.scss';

function UserProfile() {

  const [user] = useContext(UserContext);
  
  const { firstName, lastName, imgSrc, isMale, email } = user;
  return (
    <article className={styles.userProfile}>
      <img
        className={styles.userAvatar}
        src={imgSrc}
        alt={`${firstName}${lastName}`}
      />
      <h2 className={styles.userName}>
        {firstName} {lastName}
      </h2>
      <p className={styles.userGender}>Gender: {isMale ? 'male' : 'female'}</p>
      <p className={styles.userEmail}>Email: {email}</p>
    </article>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    isMale: PropTypes.bool,
    email: PropTypes.string.isRequired,
    password: PropTypes.string
  })
};

export default UserProfile;
