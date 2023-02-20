import { useState, useEffect } from 'react';

function MonthGame() {
  // Define an array with the names of the months
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Define state variables for the current month and the user's answer
  const [currentMonth, setCurrentMonth] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(currentMonth);
      synth.speak(utterance);
    }
  }, [currentMonth]);

  // Define a function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (parseInt(userAnswer) === months.indexOf(currentMonth) + 1) {
      console.log(userAnswer + ' Is Correct!');
      const correctSound = new Audio('/correct.mp3');
      correctSound.play();
    } else {
      console.log('Incorrect. Try again!');
      const incorrectSound = new Audio('/incorrect.mp3');
      incorrectSound.play();
    }
    chooseRandomMonth();
    setUserAnswer('');
  };

  // Define a function to choose a random month
  const chooseRandomMonth = () => {
    const randomIndex = Math.floor(Math.random() * months.length);
    setCurrentMonth(months[randomIndex]);
  };

  useEffect(() => {
    chooseRandomMonth();
  }, []);

  return (
    <div>
      <h1>Guess the Month</h1>
      <p>Enter the number of the month (1-12) for {currentMonth}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Number:
          <input
            type="text"
            value={userAnswer}
            onChange={(event) => setUserAnswer(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MonthGame;