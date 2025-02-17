import { useEffect, useState } from 'react';
import UserList from '../../components/UsersList';
import { getUsers } from '../../api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(users => {
      setUsers(users)
    });
  }, []);

  const handleDeleteUser = (id) => {

    const newUsers = users.filter((user) => {
      return user.id !== id;
    });

    setUsers(newUsers);
  }

  return (
    <div>
      <h2>Users page</h2>
      <UserList users={users} handleDeleteUser={handleDeleteUser}/>
    </div>
  );
};

export default UsersPage;
