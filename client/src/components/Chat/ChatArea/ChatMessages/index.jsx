import MessageItem from './MessageItem';
import styles from './ChatMessages.module.scss';

const ChatMessages = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div>No messages in this chat yet.</div>;
  }

  return (
    <ul className={styles.ChatList}>
      {messages.map((message) => {
        return <MessageItem key={message.id} message={message} />;
      })}
    </ul>
  );
};

export default ChatMessages;
