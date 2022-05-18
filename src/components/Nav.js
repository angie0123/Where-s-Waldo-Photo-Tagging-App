import waldo from '../images/waldo.webp';
import whitebeard from '../images/whitebeard.webp';
import odlaw from '../images/odlaw.webp';

const Nav = ({ timer }) => {
  const parseTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    return [minutes, seconds];
  };
  const [minutes, seconds] = parseTimer();
  return (
    <nav>
      <div className="logo">Where's Waldo</div>
      <div className="wanted-list">
        <div>
          <img src={waldo} alt="waldo" />
          <div>Waldo</div>
        </div>
        <div>
          <img src={whitebeard} alt="whitebeard" />
          <div>Whitebeard</div>
        </div>
        <div>
          <img src={odlaw} alt="Odlaw" />
          <div>Odlaw</div>
        </div>
      </div>
      <div className="timer">
        {minutes}m {seconds}s
      </div>
    </nav>
  );
};

export default Nav;
