import { useState, useEffect } from 'react'
import { PASSWORDS, randomCurrentPassword } from './utils/passwords';
import { GuessList } from './components/guessLists/guessList';
import './App.css'

function App() {
  const [currentPass, setCurrentPass] = useState(
    randomCurrentPassword()
  );
  const [robotGuess, setRobotGuess] = useState("");
  const [allRobotGuesses, setallRobotGuesses] = useState([]);
  const [passWords, setPassWords] = useState(PASSWORDS)

  const currentPassArray = Array.from(currentPass);
  const correctBotGuess = ["", "", "", "", ""];
  const robotGuessArray = Array.from(robotGuess);
  let passwords;

  const compareHandler = () => {
    for (let i = 0; i <= robotGuessArray.length - 1; i++) {
      if (robotGuessArray[i] === currentPassArray[i]) {
        correctBotGuess[i] = robotGuessArray[i];
      }
    }
    if (robotGuess.localeCompare(currentPass) == 0) {
      alert("you won!!!!");
      location.reload();
    }
  }

  const robotGuessHandler = () => {

    passwords = passWords.filter(password => password !== robotGuess);
    correctGuessFilter();
    includeLetterGuessFilter();
    setPassWords([...passwords]);
    setRobotGuess(passwords[Math.floor(Math.random() * passwords.length)])

    passwords = passwords.filter(password => password !== robotGuess);
    if (robotGuess) allRobotGuesses.push(robotGuess);
    setallRobotGuesses([...allRobotGuesses]);
  }

  const correctGuessFilter = () => {
    for (let i = 0; i <= correctBotGuess.length - 1; i++) {
      if (correctBotGuess[i]) {
        passwords = passwords.filter(password => password[i] === correctBotGuess[i])
      }
    }
  }

  const includeLetterGuessFilter = () => {
    correctBotGuess.forEach((letter, index) => {
      if (!letter && robotGuess) {
        if (currentPassArray.includes(robotGuessArray[index])) {
          passwords = passwords.filter(password => password.includes(robotGuessArray[index]));
        }
      }
    })
  }

  useEffect(() => {
    compareHandler();
  }, [robotGuess])

  return (
    <>
      {true && <GuessList list={allRobotGuesses} />}
      <button onClick={robotGuessHandler} >CLICK TO GUESS</button>
    </>
  )
}

export default App
