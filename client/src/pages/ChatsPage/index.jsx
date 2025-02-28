import ChatMenu from '../../components/Chat/ChatMenu';
import ChatArea from '../../components/Chat/ChatArea';
import styles from './ChatsPage.module.scss';


const ChatPage = () => {
  return (
    <div className={styles.chatPageContainer}>   
      <div className={styles.chatListContainer}>
        <ChatMenu />
      </div>

      <div className={styles.chatAreaContainer}>
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatPage;
