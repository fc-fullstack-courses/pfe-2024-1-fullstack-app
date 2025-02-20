import { increment, decrement, setStep} from '../actions/actionCreators';

// початковий стан для редюсера
const initialState = {
  count: 0,
  step: 1,
};

// базовий редаксівський редюсер
// початковий стан передаємо як значення за замовчанням для state
export default function counterReducer(state = initialState, action) {
  // по типу екшену визначаємо його логіку
  switch (action.type) {
    case increment.type: {
      // створюємо новий стан та повертаємо як результат редюсера
      const newState = {
        ...state,
        count: state.count + state.step,
      };

      return newState;
    }
    case decrement.type: {
      const newState = {
        ...state,
        count: state.count - state.step,
      };

      return newState;
    }
    case setStep.type: {
      const newStep = +action.payload;

      const newState = {
        ...state,
        step: !isNaN(newStep) ? newStep : state.step
      };

      return newState;
    }
    // якщо тип екшена невідомий або відсутній то повертаємо старий стан
    default:
      return state;
  }
}