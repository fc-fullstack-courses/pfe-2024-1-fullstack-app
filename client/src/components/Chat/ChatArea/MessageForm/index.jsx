import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageToChat } from '../../../../store/slices/chatSlice';
import { useSelector } from 'react-redux';
import styles from './MessageForm.module.scss';

const MessageForm = ({ chatId }) => {
  const [messageText, setMessageText] = useState('');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageText.trim() !== '') {
      dispatch(
        sendMessageToChat({
          chatId,
          text: messageText,
          authorId: user.id,
        })
      );

      setMessageText('');
    }
  };

  return (
    <form onSubmit={handleSendMessage} className={styles.messageForm}>
      <input
        type='text'
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder='Write a message...'
        className={styles.messageFormInput}
      />

      <button type='submit' className={styles.messageFormButton}>
        Send
      </button>
    </form>
  );
};

export default MessageForm;
