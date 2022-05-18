import { useState, useEffect, useRef } from 'react';
import Photo from './components/Photo';
import { onSnapshot, getFirestore, collection } from 'firebase/firestore';
import Nav from './components/Nav';

function App() {
  const [solution, setSolution] = useState([]);
  const [displayMenu, setDisplayMenu] = useState(null);
  const [marker, setMarker] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(0);

  useEffect(() => {
    onSnapshot(collection(getFirestore(), 'beach'), (snapshot) => {
      let dbSolution = [];
      snapshot.forEach((doc) => {
        dbSolution.push(doc.data());
      });
      setSolution(dbSolution);
      setCharacterList(dbSolution.map((character) => character.name));
    });
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timer]);

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

  const submitAnswerHandler = (event) => {
    const name = event.currentTarget.getAttribute('data-name');
    const [character] = solution.filter((character) => character.name === name);
    const { minX, minY, maxX, maxY } = character;
    const { x, y } = displayMenu;

    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      setMarker(character.name);
      setCharacterList(characterList.filter((character) => character !== name));
      setTimeout(() => {
        setMarker(null);
      }, 5000);
    }
  };

  return (
    <>
      <Nav timer={timer} />
      {marker && <div>You just found {marker}</div>}
      <Photo
        handleClick={clickHandler}
        displayMenu={displayMenu}
        handleSubmitAnswer={submitAnswerHandler}
        characterList={characterList}
      />
    </>
  );
}

export default App;
