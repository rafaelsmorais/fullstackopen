import { useState } from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
};

const Display = (props) => {
  return <h2>{props.text}</h2>;
};

const Statistics = (props) => {
  return (
    <div>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };
  return (
    <div>
      <Display text="give feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Display text="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
