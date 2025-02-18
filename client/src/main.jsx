import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import ReduxCounter from './components/ReduxCounter/index.jsx';

// початковий стан для редюсера
const initialState = {
  count: 0,
  step: 1,
};

// базовий редаксівський редюсер
// початковий стан передаємо як значення за замовчанням для state
function reducer(state = initialState, action) {
  // по типу екшену визначаємо його логіку
  switch (action.type) {
    case 'increment': {
      // створюємо новий стан та повертаємо як результат редюсера
      const newState = {
        ...state,
        count: state.count + state.step,
      };

      return newState;
    }
    // якщо тип екшена невідомий або відсутній то повертаємо старий стан
    default:
      return state;
  }
}

// створення стори станів редаксу
const store = createStore(reducer);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ReduxCounter />
    </Provider>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </StrictMode>
);

/*
  Алгоритм роботи з redux:
    1.  створюємо редюсер для глобального стану
    2.  на основі редюсеру створємо стору
    3.  під'єднуємо редакс до реакту через компонент Provider
        бібліотеки react-redux
    4.  у компоненті який буде отримувати дані з редаксу запускаємо 
        функцію connect і передаємо їй яку частину стори ми хочемо отримати
        через mapStateToProps
    5.  connect поверне компонент вищого порядку в який ми передамо наш реактівський компонент
        і отримаємо з нього компонент який буде під'єнано до стану який ви просили
        у mapStateToProps (стан буде у пропсах)
    6.  також у вашому компоненті в пропсах знайдете dispatch щоб відправляти екшени
*/