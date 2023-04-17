import React, { useState, useEffect } from 'react';

import { loadModels } from '../helpers/faceApi';
import { createFaLibrary } from '../helpers/icons';
import CartContainer from './CartContainer';

import { useStateValue } from '../context/StateProvider';

import Camera from '../components/Camera/Camera';

// import './App.css';
createFaLibrary();
loadModels();
function Mood() {
    const [{cartShow }, dispatch] = useStateValue();
    useEffect(() => {}, [cartShow]);
  const [mode, setMode] = useState(true); //true = photo mode; false = video mode

  return (
    <div className="App">

      <Camera photoMode={mode} />
      {cartShow && <CartContainer />}
    </div>

  );
}

export default Mood;
