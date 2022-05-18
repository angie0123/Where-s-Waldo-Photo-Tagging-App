import image from '../images/beach.jpg';
import Dropdown from './Dropdown';

const Photo = ({
  handleClick,
  displayMenu,
  handleSubmitAnswer,
  characterList,
}) => {
  return (
    <div
      className="photo-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: '800px',
        width: '90vw',
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
          characterList={characterList}
        />
      )}
    </div>
  );
};

export default Photo;
