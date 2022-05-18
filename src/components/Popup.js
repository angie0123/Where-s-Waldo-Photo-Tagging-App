import { useState } from 'react';
import Form from './Form';
import Scoretable from './Highscores';

const Popup = ({ timer, highscores, submitHandler }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const parseTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return [minutes, seconds];
  };
  const [minutes, seconds] = parseTimer(timer);
  const sortedScores = highscores.sort((a, b) => a.score - b.score);
  if (
    sortedScores.length < 10 ||
    timer < sortedScores[sortedScores.length - 1].score
  ) {
    if (displayForm === false) setDisplayForm(true);
  }

  return (
    <>
      <Scoretable scores={sortedScores} parseTimer={parseTimer} />
      <div>
        Your score is {minutes}m {seconds}s
      </div>
      {displayForm && <Form score={timer} submitHandler={submitHandler} />}
    </>
  );
};

export default Popup;
