import PropTypes from 'prop-types';
import styles from './MessageItem.module.scss';

const MessageItem = ({ message }) => {
  const { text, author } = message;

  return (
    <li className={styles.chatItem}>
      <div className={styles.chatItemHeader}>
        {author.firstName} {author.lastName}
      </div>
      <div className={styles.chatItemContent}>
        <p>{text}</p>
      </div>
    </li>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MessageItem;
