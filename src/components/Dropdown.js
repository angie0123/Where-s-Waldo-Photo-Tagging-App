const Dropdown = ({ xPos, yPos, handleSubmitAnswer, characterList }) => {
  return (
    <div
      className="dropdown"
      style={{
        top: `${yPos}px`,
        left: `${xPos}px`,
        backgroundColor: 'yellow',
        zIndex: '99',
        width: '50px',
        position: 'absolute',
      }}
    >
      <ul>
        {characterList.map((name, index) => {
          return (
            <li key={index} data-name={name} onClick={handleSubmitAnswer}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
