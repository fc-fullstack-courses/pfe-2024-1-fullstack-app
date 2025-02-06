import { useState, useEffect } from 'react';

function FunctionComponent(props) {
  const {
    task: { title },
  } = props;

  // const [state, setState] = useState({clicks: 0, isAutoincrementing: false});

  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log('запускається на першому і усіх наступних рендерах');

    return () => {
      console.log(
        'запускається при розмонтуванні та перед наступним ререндером'
      );
    };
  });

  useEffect(() => {
    console.log(`clicks: ${clicks}`);
  }, [clicks]);

  useEffect(() => {
    let id = setInterval(() => {
      console.log('fake click');
      setClicks((clicks) => {
        return clicks + 1;
      });
    }, 2000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const handleClick = () => {
    // setClicks(clicks + 1);

    // setState({
    //   clicks: clicks + 1
    // })

    setClicks((oldClicks) => {
      return oldClicks + 1;
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
