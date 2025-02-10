import { useState } from 'react';
import UserProfile from '../../components/UserProfile ';
import styles from './UserProfilePage.module.scss';
import UserUpdateForm from '../../components/UserUpdateForm';

const UserProfilePage = () => {
  const [isEditingUser, setIsEditingUser] = useState(false);

  const handleToggleEditing = () => {
    setIsEditingUser(!isEditingUser);
  };

  return (
    <div className={styles.container}>
      <h2>Profile page</h2>
      <button className={styles.btn} onClick={handleToggleEditing}>
        {isEditingUser ? 'Cancel Edit' : 'Edit'}
      </button>
      {!isEditingUser ? <UserProfile /> : <UserUpdateForm />}
    </div>
  );
};

export default UserProfilePage;
