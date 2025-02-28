import { selectCurrentChat } from "../../../../../store/slices/chatSlice";
import styles from './ChatItem.module.scss';

const ChatItem = ({chat, dispatch}) => {
  
  return (
    <li
      className={styles.chatItem}
      onClick={() => dispatch(selectCurrentChat(chat.id))}
    >
      {chat.name}
    </li>
  );
};

export default ChatItem;
