const Highscores = ({ scores, parseTimer }) => {
  return (
    <div className="highscores">
      <div className="heading">Current Top 10 Scores </div>
      <ul>
        <li className="labels">
          <div>Name</div>
          <div>Score</div>
        </li>
        {scores.map((entry, index) => {
          const [minutes, seconds] = parseTimer(entry.score);
          return (
            <li key={index}>
              <div>{entry.name}</div>
              <div>
                {minutes}m {seconds}s
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Highscores;
