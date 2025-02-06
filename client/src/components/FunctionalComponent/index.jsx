import { useState } from 'react';

function FunctionComponent(props) {
  const {
    task: { title },
  } = props;

  // const [state, setState] = useState({clicks: 0, isAutoincrementing: false});

  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    // setClicks(clicks + 1);

    // setState({
    //   clicks: clicks + 1
    // })

    setClicks((oldClicks) => {
      return oldClicks + 1
    });
  };

  const handleReset = () => {
    setClicks(0);
  };

  return (
    <div>
      <h2>Function component</h2>
      <p>{title}</p>
      <p>Clicks: {clicks}</p>
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleReset}>Reset clicks</button>
    </div>
  );
}

export default FunctionComponent;
