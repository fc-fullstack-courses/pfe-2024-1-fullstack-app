import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import ReduxCounter from './components/ReduxCounter/index.jsx';
import store from './store/index.js';

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
    redux react-redux
*/