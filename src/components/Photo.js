import image from '../images/waldo-beach.png';
import Dropdown from './Dropdown';

const Photo = ({ handleClick, displayMenu }) => {
  return (
    <div
      className="photo-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: '1000px',
        width: '1400px',
        margin: '0 auto',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      {displayMenu && <Dropdown xPos={displayMenu.x} yPos={displayMenu.y} />}
    </div>
  );
};

export default Photo;
