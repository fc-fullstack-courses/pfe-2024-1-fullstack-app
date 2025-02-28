import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllChats } from '../../../../store/slices/chatSlice';
import styles from './ChatList.module.scss';
import ChatItem from './ChatItem';

const ChatList = () => {
  const dispatch = useDispatch();
  const { chats, isLoading } = useSelector((state) => state.chat);
  const userId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    dispatch(getAllChats(userId));
  }, [dispatch, userId]);

  if (isLoading) {
    return <div>Loading chats...</div>;
  }

  if (!chats || chats.length === 0) {
    return <div>No chats available.</div>;
  }

  return (
    <div className={styles.chatListContainer}>
      <ul className={styles.chatList}>
        {chats.map((chat) => {
          return (
            <ChatItem
              key={chat.id}
              chat={chat}
              dispatch={dispatch}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
