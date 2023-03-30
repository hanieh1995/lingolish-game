import { useState, useEffect } from 'react'
import { PASSWORDS, randomCurrentPassword } from './utils/passwords';
import { GuessList } from './components/guessLists/guessList';
import { VirtualKeyboard } from './components/virtualKeyboard/virtualKeyboard';
import { StartGame } from './components/startGame/startGame';
import { PlayerInsertion } from './components/playerInsertion/playerInsertion';
import './App.css'
import { Loading } from './components/loading/loading';

function App() {
  const [currentPass, setCurrentPass] = useState(
    randomCurrentPassword()
  );
  const [allGuesses, setAllGuesses] = useState([]);
  const [passWords, setPassWords] = useState(PASSWORDS);
  const [robotGuess, setRobotGuess] = useState("");
  const [playerGuess, setPlayerGuess] = useState([]);
  const [correctBotGuess, setCorrectBotGuess] = useState(["", "", "", "", ""]);
  const [correctPlayerGuess, setCorrectPlayerGuess] = useState(["", "", "", "", ""]);
  const [includePlayerGuess, setIncludePlayerGuess] = useState(["", "", "", "", ""]);

  const [turn, setTurn] = useState(["Bot"]);
  const [mode, setMode] = useState("");

  const currentPassArray = Array.from(currentPass);
  const robotGuessArray = Array.from(robotGuess);
  let passwords;

  const compareBotGuessHandler = () => {
    for (let i = 0; i <= robotGuessArray.length - 1; i++) {
      if (robotGuessArray[i] === currentPassArray[i]) {
        correctBotGuess[i] = robotGuessArray[i];
      }
    }
    setCorrectBotGuess([...correctBotGuess]);
    winCheck("Bot");
  }

  const comparePlayerGuessHandler = () => {
    for (let i = 0; i <= playerGuess.length - 1; i++) {
      if (playerGuess[i] === currentPassArray[i]) {
        correctPlayerGuess[i] = playerGuess[i];
      }
    }
    setCorrectPlayerGuess([...correctPlayerGuess]);
    winCheck("Player");
  }

  const includeLetterGuessPlayer = () => {
    correctPlayerGuess.forEach((letter, index) => {
      if (!letter && playerGuess) {
        if (currentPassArray.includes(playerGuess[index]) && !includePlayerGuess.includes(playerGuess[index])) {

          includePlayerGuess[index] = playerGuess[index];
        }
      }
    })
    setIncludePlayerGuess([...includePlayerGuess])
  }


  const robotGuessHandler = () => {
    setTimeout(() => {
      passwords = passWords.filter(password => password !== robotGuess);
      setPassWords([...passwords]);
      if (mode !== "Easy") correctGuessFilter();
      if (mode === "Hard") includeLetterGuessFilter();
      setRobotGuess(passwords[Math.floor(Math.random() * passwords.length)]);
      compareBotGuessHandler();
      if (robotGuess) allGuesses.push({ guess: robotGuess, current: "bot" });
      setAllGuesses([...allGuesses]);
      turn[0] = "Player";
      setTurn([...turn]);

    }, 100);
  }

  const correctGuessFilter = () => {
    for (let i = 0; i <= correctBotGuess.length - 1; i++) {
      if (correctBotGuess[i]) {
        passwords = passwords.filter(password => password[i] === correctBotGuess[i])
      }
    }
    setPassWords([...passwords]);
  }

  const includeLetterGuessFilter = () => {
    correctBotGuess.forEach((letter, index) => {
      if (!letter && robotGuess) {
        if (currentPassArray.includes(robotGuessArray[index])) {
          passwords = passwords.filter(password => password.includes(robotGuessArray[index]));
        }
      }
    })
    setPassWords([...passwords]);
  }

  const clickHandler = (event) => {
    if (turn[0] === "Player") {
      let playerguess = playerGuess;
      playerguess.push(event.target.value);
      setPlayerGuess([...playerguess]);

      if (playerGuess.length === 5) {
        allGuesses.push({ guess: playerGuess, current: "player" });
        setAllGuesses([...allGuesses]);
        setPlayerGuess([]);
        comparePlayerGuessHandler();
        includeLetterGuessPlayer();
        turn[0] = "Bot";
        setTurn([...turn]);
        robotGuessHandler();
        console.log(includePlayerGuess);
        console.log(currentPass);
      }
    }
  }

  const modeHandle = (event) => {
    if (event.target.innerHTML === "Easy") {
      setMode("Easy");
    } else if (event.target.innerHTML === "Normal") {
      setMode("Normal");
    } else {
      setMode("Hard");
    }
    robotGuessHandler();
  }

  const deleteHandler = () => {
    playerGuess.pop();
    setPlayerGuess([...playerGuess]);
  }

  const winCheck = (currentPlayer) => {
    if (currentPlayer === "Player") {
      if (playerGuess && playerGuess.join("").localeCompare(currentPass) == 0) {
        alert("you won :)");
        location.reload();
      }
    } else {
      if (robotGuess && robotGuess.localeCompare(currentPass) == 0) {
        alert("you lost :(");
        location.reload();
      }
    }
  }


  useEffect(() => {
    robotGuessHandler();
  }, [])



  return (
    <>
      {!mode && <StartGame modeHandle={modeHandle} />}
      {
        allGuesses.length !== 0 && <GuessList list={allGuesses}
          correctPlayerGuess={correctPlayerGuess}
          includePlayerGuess={includePlayerGuess}
        />}
      {turn[0] === "Bot" && <div className="loading-container">
        <Loading />
      </div>}

      <PlayerInsertion playerGuess={playerGuess} />
      <div className='keyboard-container'>
        <VirtualKeyboard clickHandler={clickHandler} deleteHandler={deleteHandler} />
      </div>
    </>
  )
}

export default App
