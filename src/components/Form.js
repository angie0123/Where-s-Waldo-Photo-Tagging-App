import { useState } from 'react';

const Form = ({ submitHandler }) => {
  const [input, setInput] = useState('');
  return (
    <form onSubmit={(event) => submitHandler(event, input)}>
      <label htmlFor="name">
        {' '}
        Name:
        <input
          id="name"
          type="text"
          onInput={(e) => setInput(e.currentTarget.value)}
        ></input>
      </label>
      <button>Add score</button>
    </form>
  );
};

export default Form;
