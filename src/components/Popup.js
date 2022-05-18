const Popup = ({ timer, highscores }) => {
  const parseTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return [minutes, seconds];
  };
  const [minutes, seconds] = parseTimer(timer);
  const sortedScores = highscores.sort((a, b) => a.score - b.score);

  return (
    <>
      <div>
        Current HighScores{' '}
        <ul>
          {sortedScores.map((entry, index) => {
            console.log(entry.score);
            const [entryMinutes, entrySeconds] = parseTimer(entry.score);
            return (
              <li key={index}>
                <div>Name: {entry.name}</div>
                <div>
                  Score: {entryMinutes}m {entrySeconds}s
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        Your score is {minutes}m {seconds}s
      </div>
    </>
  );
};

export default Popup;
