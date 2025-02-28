import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChat } from '../../../../store/slices/chatSlice';
import styles from './ChatForm.module.scss';

const ChatForm = () => {
  const [chatName, setChatName] = useState('');
  const dispatch = useDispatch();

  const handleCreateChat = () => {
    dispatch(createChat({ chatName }));
    setChatName('');
  };

  return (
    <div className={styles.chatFormContainer}>
      <h2>Create New Chat</h2>

      <div className={styles.chatFormInputGroup}>
        <label>Chat Name:</label>
        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          placeholder="Enter chat name"
        />
      </div>

      <button
        className={styles.chatFormButton}
        onClick={handleCreateChat}
        disabled={!chatName}
      >
        Create Chat
      </button>
    </div>
  );
};

export default ChatForm;
