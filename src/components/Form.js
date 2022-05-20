import { useState } from 'react';

const Form = ({ submitHandler }) => {
  const [input, setInput] = useState('');
  return (
    <form onSubmit={(event) => submitHandler(event, input)}>
      <input
        id="name"
        type="text"
        placeholder="name"
        onInput={(e) => setInput(e.currentTarget.value)}
      ></input>
      <button className="button">Add score</button>
    </form>
  );
};

export default Form;
