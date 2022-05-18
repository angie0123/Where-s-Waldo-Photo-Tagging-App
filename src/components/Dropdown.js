const Dropdown = ({ xPos, yPos }) => {
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
      Waldo
    </div>
  );
};

export default Dropdown;
