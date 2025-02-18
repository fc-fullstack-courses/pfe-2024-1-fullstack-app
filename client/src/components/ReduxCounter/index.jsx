import { connect } from 'react-redux';

const ReduxCounter = (props) => {
  const { count, step, dispatch } = props;

  const handleAddStep = () => {
    const incrementAction = {
      type: 'increment',
    };

    dispatch(incrementAction);
  };

  const handleChangeStep = ({ target: { value } }) => {};

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleAddStep}>Add step</button>
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
  return state;
};

// withProps - Компонент вищого порядку, який дозволить під'єднати редакс до компоненту
const withProps = connect(mapStateToProps);

// тут вже буде компонент якому в пропси кинули те що mapStateToProps передав
const CounterWithRedux = withProps(ReduxCounter);

export default CounterWithRedux;
