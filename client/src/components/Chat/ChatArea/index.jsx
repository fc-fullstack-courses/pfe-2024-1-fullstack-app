import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../../store/slices/chatSlice';
import MessageForm from './MessageForm';
import ChatMessages from './ChatMessages';
import styles from './ChatArea.module.scss';

const ChatArea = () => {
  const dispatch = useDispatch();
  const { currentChat, isLoading } = useSelector((state) => state.chat);

  useEffect(() => {
    if(currentChat?.id) {
      dispatch(getAllMessages(currentChat.id));
    }
  }, [currentChat?.id, dispatch]);

  if (!currentChat) {
    return (
      <div className={styles.chatArea}>Choose Chat to start communicating.</div>
    );
  }

  return (
    <div className={styles.chatArea}>
      <h2>Chat</h2>

      {isLoading ? (
        <div className={styles.chatArea}>Loading messages ...</div>
      ) : (
        <>
          <ChatMessages messages={currentChat.messages}/>
          <div className={styles.MessageFormContainer}>
            <MessageForm chatId={currentChat.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
