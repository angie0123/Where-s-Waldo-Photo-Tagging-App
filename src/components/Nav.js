const Nav = ({ timer }) => {
  const parseTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    return [minutes, seconds];
  };
  const [minutes, seconds] = parseTimer();
  return (
    <>
      {minutes}m : {seconds}s{' '}
    </>
  );
};

export default Nav;
