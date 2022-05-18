const Highscores = ({ scores, parseTimer }) => {
  return (
    <div>
      Current Top 10 HighScores{' '}
      <ul>
        {scores.map((entry, index) => {
          const [minutes, seconds] = parseTimer(entry.score);
          return (
            <li key={index}>
              <div>Name: {entry.name}</div>
              <div>
                Score: {minutes}m {seconds}s
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Highscores;
