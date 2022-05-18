import image from '../images/waldo-beach.png';
import Dropdown from './Dropdown';

const Photo = ({ handleClick, displayMenu, handleSubmitAnswer }) => {
  return (
    <div
      className="photo-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: '800px',
        width: '1100px',
        margin: '0 auto',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      {displayMenu && (
        <Dropdown
          xPos={displayMenu.x}
          yPos={displayMenu.y}
          handleSubmitAnswer={handleSubmitAnswer}
        />
      )}
    </div>
  );
};

export default Photo;
