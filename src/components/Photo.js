import image from '../images/waldo-beach.png';

const Photo = () => {
  return (
    <div
      className="photo-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: '1000px',
        width: '1400px',
        margin: '0 auto',
      }}
    ></div>
  );
};

export default Photo;
