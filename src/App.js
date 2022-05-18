import { useState, useEffect } from 'react';
import Photo from './components/Photo';
import { onSnapshot, getFirestore, collection } from 'firebase/firestore';
function App() {
  const [solution, setSolution] = useState([]);
  const [displayMenu, setDisplayMenu] = useState(null);
  const [marker, setMarker] = useState(false);
  useEffect(() => {
    onSnapshot(collection(getFirestore(), 'characters'), (snapshot) => {
      let dbSolution = [];
      snapshot.forEach((doc) => {
        dbSolution.push(doc.data());
      });
      setSolution(dbSolution);
    });
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
    const { minX, minY, maxX, maxY } = solution[0];
    const { x, y } = displayMenu;
    if (x >= +minX && x <= +maxX && y >= +minY && y <= +maxY) {
      setMarker(true);
      setTimeout(() => {
        setMarker(false);
      }, 5000);
    }
  };

  return (
    <>
      {marker && <div> You just found Waldo! </div>}
      <Photo
        handleClick={clickHandler}
        displayMenu={displayMenu}
        handleSubmitAnswer={submitAnswerHandler}
      />
    </>
  );
}

export default App;
