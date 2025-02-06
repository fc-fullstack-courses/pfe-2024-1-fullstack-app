import { useState } from 'react';
import ClassComponent from './components/ClassComponent';
import FunctionComponent from './components/FunctionalComponent';

const task = {
  title: 'Learn fullstack',
  isDone: false,
};

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <h1>Vite app</h1>
      <button onClick={toggleVisibility}>Toggle visibility</button>
      {/* {isVisible && <ClassComponent prop1="test prop 1" prop2 prop3={4} prop4={{ id: 0}} task={task}/>} */}
      {isVisible && (
        <FunctionComponent
          prop1='test prop 1'
          prop2
          prop3={4}
          prop4={{ id: 0 }}
          task={task}
        />
      )}
    </>
  );
}

export default App;
