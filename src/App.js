import { useState } from 'react';
import Photo from './components/Photo';

function App() {
  const [displayMenu, setDisplayMenu] = useState(null);
  const clickHandler = (event) => {
    if (displayMenu === null) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setDisplayMenu({ x, y });
    } else {
      setDisplayMenu(null);
    }
  };
  return <Photo handleClick={clickHandler} displayMenu={displayMenu} />;
}

export default App;
