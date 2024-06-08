import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export const App = () => {
  const [tenzies, setTenzies] = useState(false);
  const [dices, setDices] = useState(allNewDice);
  const [roll, setRoll] = useState(0);
  const [start, setStart] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  if (seconds > 59) {
    setSeconds(0);
  }
  if (minutes > 59) {
    setMinutes(0);
    setHours(hour => hour + 1);
  }
  if (hours > 23) {
    setHours(0);
  }

  useEffect(() => {
    let timer = setInterval(() => {
      if (!start) {
        return;
      }
      if (tenzies) {
        return;
      }
      setSeconds(second => second + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [start, !tenzies]);

  useEffect(() => {
    let value = dices[0].value;
    let isHeld = dices.every(dice => dice.isHeld);
    let isSameValue = dices.every(dice => dice.value === value);
    if (isSameValue && isHeld) {
      setTenzies(true);
    }
    else {
      setTenzies(false);
    }
  }, [dices]);

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({ id: nanoid(), value: (Math.floor(Math.random() * 6) + 1), isHeld: false });
    }
    return newArray
  }

  function holdDice(id){
    setStart(true)
    if (tenzies){
      return
    }
    setDices(dices => dices.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }

  return (
    <main>
      <h1 className="heading">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </main>
  );
};
 export default App;