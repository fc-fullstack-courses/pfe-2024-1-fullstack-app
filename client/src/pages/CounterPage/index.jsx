
import ReduxCounter from '../../components/ReduxCounter';
import styles from './CounterPage.module.scss';

const CounterPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Counter page</h2>
      {/* <Counter /> */}
      <ReduxCounter />
    </div>
  );
}

export default CounterPage;