import { connect } from 'react-redux';
import {
  increment,
  decrement,
  setStep,
} from '../../store/actions/actionCreators';

const ReduxCounter = (props) => {
  const { count, step, dispatch } = props;

  const handleAddStep = () => {
    const incrementAction = increment();

    dispatch(incrementAction);
  };
  const handleSubtractStep = () => {
    dispatch(decrement());
  };

  const handleChangeStep = ({ target: { value } }) => {
    dispatch(setStep(value));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleAddStep}>Add step</button>
      <button onClick={handleSubtractStep}>Subtract step</button>
      <label>
        Step:{' '}
        <select value={step} onChange={handleChangeStep}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
        </select>
      </label>
    </div>
  );
};

// функція яка пояснює яку частинку редаксівського стану під'єднуємо до компонента
const mapStateToProps = (state) => {
  // об'єкт який повертається буде додано до пропсів компонента
  return state.counter;
};

// withProps - Компонент вищого порядку, який дозволить під'єднати редакс до компоненту
const withProps = connect(mapStateToProps);

// тут вже буде компонент якому в пропси кинули те що mapStateToProps передав
const CounterWithRedux = withProps(ReduxCounter);

export default CounterWithRedux;
