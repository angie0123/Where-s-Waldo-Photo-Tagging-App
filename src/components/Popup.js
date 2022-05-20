import Form from './Form';
import Scoretable from './Highscores';

const Popup = ({
  timer,
  highScores,
  submitHandler,
  displayMode,
  playAgainHandler,
}) => {
  const parseTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return [minutes, seconds];
  };
  const [minutes, seconds] = parseTimer(timer);

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div>
            Your score is {minutes}m {seconds}s
          </div>
          {displayMode === 'play again' && (
            <div className="button" onClick={playAgainHandler}>
              Play Again
            </div>
          )}
          {displayMode === 'form' && (
            <Form score={timer} submitHandler={submitHandler} />
          )}
          <Scoretable scores={highScores} parseTimer={parseTimer} />
        </div>
      </div>
    </>
  );
};

export default Popup;
