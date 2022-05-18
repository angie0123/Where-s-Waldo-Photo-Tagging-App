import { useState, useEffect, useRef } from 'react';
import Photo from './components/Photo';
import {
  onSnapshot,
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import Nav from './components/Nav';
import Popup from './components/Popup';

function App() {
  const [solution, setSolution] = useState([]);
  const [displayMenu, setDisplayMenu] = useState(null);
  const [marker, setMarker] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const [gameover, setGameover] = useState(false);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    onSnapshot(collection(getFirestore(), 'highscores'), (snapshot) => {
      let dbHighScores = [];
      snapshot.forEach((doc) => {
        dbHighScores.push(doc.data());
      });
      setHighScores(dbHighScores);
    });
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
  }, []);

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
      if (characterList.length === 1) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setGameover(true);
        }, 4000);
      }
      setCharacterList((prev) =>
        prev.filter((character) => character !== name)
      );
      setTimeout(() => {
        setMarker(null);
      }, 3000);
    }
  };

  const submitHandler = async (event, input) => {
    event.preventDefault();
    console.log(input);
    try {
      await addDoc(collection(getFirestore(), 'highscores'), {
        score: timer,
        name: input,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Something went wrong writing to Firebase database', error);
    }
  };

  return (
    <>
      {gameover && (
        <Popup
          timer={timer}
          highscores={highScores}
          submitHandler={submitHandler}
        />
      )}
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
