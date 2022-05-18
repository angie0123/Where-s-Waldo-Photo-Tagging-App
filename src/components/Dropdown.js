const Dropdown = ({ xPos, yPos, handleSubmitAnswer }) => {
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
      onClick={handleSubmitAnswer}
    >
      Waldo
    </div>
  );
};

export default Dropdown;
