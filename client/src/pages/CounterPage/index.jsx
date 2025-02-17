
import Counter from '../../components/Counter';
import styles from './CounterPage.module.scss';

const CounterPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Counter page</h2>
      <Counter />
    </div>
  );
}

export default CounterPage;