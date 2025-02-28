import ChatList from './ChatList';
import ChatForm from './ChatForm';
import styles from './ChatMenu.module.scss';

const ChatMenu = () => {
  return (
    <div className={styles.chatContainer}>
      <h2>Chats</h2>

      <div className={styles.chatList}>
        <ChatList />
      </div>

      <div className={styles.chatForm}>
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatMenu;
