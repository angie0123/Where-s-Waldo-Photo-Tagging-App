import { useState, useEffect, useRef } from 'react';
import Photo from './components/Photo';
import {
  onSnapshot,
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
  query,
} from 'firebase/firestore';
import Nav from './components/Nav';
import Popup from './components/Popup';

function App() {
  const [solution, setSolution] = useState([]);
  const [displayMenu, setDisplayMenu] = useState(null);
  const [marker, setMarker] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const [highScores, setHighScores] = useState([]);
  const [popUpDisplay, setPopupDisplay] = useState(null);

  useEffect(() => {
    const scoresRef = collection(getFirestore(), 'highscores');
    const scoreQuery = query(scoresRef, orderBy('score', 'asc'), limit(10));
    const unsubScore = onSnapshot(scoreQuery, (snapshot) => {
      let dbHighScores = [];
      snapshot.forEach((doc) => {
        dbHighScores.push(doc.data());
      });
      setHighScores(dbHighScores);
    });
    const unsubSolution = onSnapshot(
      collection(getFirestore(), 'beach'),
      (snapshot) => {
        let dbSolution = [];
        snapshot.forEach((doc) => {
          dbSolution.push(doc.data());
        });
        setSolution(dbSolution);
        setCharacterList(dbSolution.map((character) => character.name));
      }
    );
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
      unsubScore();
      unsubSolution();
    };
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
      if (foundCharacters.length === characterList.length - 1) {
        //game over
        console.log(intervalRef.current);
        clearInterval(intervalRef.current);
        setTimeout(() => {
          renderPopup();
        }, 4000);
      }
      setFoundCharacters((prev) => [...prev, name]);
      setTimeout(() => {
        setMarker(null);
      }, 3000);
    }
  };

  const renderPopup = () => {
    highScores.length < 10 || timer < highScores[highScores.length - 1].score
      ? setPopupDisplay('form')
      : setPopupDisplay('play again');
  };

  const submitHandler = async (event, input) => {
    event.preventDefault();
    try {
      await addDoc(collection(getFirestore(), 'highscores'), {
        score: timer,
        name: input,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Something went wrong writing to Firebase database', error);
    }
    setPopupDisplay('play again');
  };

  const playAgainHandler = () => {
    setFoundCharacters([]);
    setPopupDisplay(null);
    setTimer(0);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    console.log(intervalRef.current);
  };

  return (
    <>
      {popUpDisplay && (
        <Popup
          timer={timer}
          highScores={highScores}
          submitHandler={submitHandler}
          displayMode={popUpDisplay}
          playAgainHandler={playAgainHandler}
        />
      )}
      <Nav timer={timer} />
      {marker && <div>You just found {marker}</div>}
      <Photo
        handleClick={clickHandler}
        displayMenu={displayMenu}
        handleSubmitAnswer={submitAnswerHandler}
        toFindCharacterList={characterList.filter(
          (character) => !foundCharacters.includes(character)
        )}
      />
    </>
  );
}

export default App;
