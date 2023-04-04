import { useState, useEffect } from 'react';
import { PASSWORDS, randomCurrentPassword } from './utils/passwords';
import { GuessList } from './components/guessLists/guessList';
import { VirtualKeyboard } from './components/virtualKeyboard/virtualKeyboard';
import { StartGame } from './components/startGame/startGame';
import { PlayerInsertion } from './components/playerInsertion/playerInsertion';
import { Loading } from './components/loading/loading';
import './App.css';

function App() {
  const [currentPass, setCurrentPass] = useState(
    randomCurrentPassword()
  );
  const [allGuesses, setAllGuesses] = useState([]);
  const [passWords, setPassWords] = useState(PASSWORDS);
  const [robotGuess, setRobotGuess] = useState([""]);
  const [playerGuess, setPlayerGuess] = useState([]);
  const [correctBotGuess, setCorrectBotGuess] = useState(["", "", "", "", ""]);
  const [correctPlayerGuess, setCorrectPlayerGuess] = useState(["", "", "", "", ""]);
  const [includePlayerGuess, setIncludePlayerGuess] = useState(["", "", "", "", ""]);
  const [turn, setTurn] = useState(["Bot"]);
  const [mode, setMode] = useState([]);

  const currentPassArray = Array.from(currentPass);
  let passwords;
  let robotGuessArray;
  const compareBotGuessHandler = () => {
    robotGuessArray = Array.from(robotGuess[0]);
    for (let i = 0; i <= robotGuessArray.length - 1; i++) {
      if (robotGuess[0] && robotGuessArray[i] === currentPassArray[i]) {
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
      passwords = passWords.filter(password => password !== robotGuess[0]);
      // setPassWords([...passwords]);
      robotGuess[0] = passwords[Math.floor(Math.random() * passwords.length)];
      setRobotGuess([...robotGuess]);
      compareBotGuessHandler();
      if (mode[0] !== "Noob") correctGuessFilter();
      if (mode[0] === "Professor" || mode[0] === "Noob") includeLetterGuessFilter();
      setPassWords([...passwords]);
      if (robotGuess[0]) allGuesses.push({ guess: robotGuess[0], current: "bot" });
      setAllGuesses([...allGuesses]);
      turn[0] = "Player";
      setTurn([...turn]);
    }, 1000);
  }

  const correctGuessFilter = () => {
    for (let i = 0; i <= correctBotGuess.length - 1; i++) {
      if (correctBotGuess[i]) {
        passwords = passwords.filter(password => password[i] === correctBotGuess[i])
      }
    }

  }

  const includeLetterGuessFilter = () => {
    robotGuessArray = Array.from(robotGuess[0]);
    correctBotGuess.forEach((letter, index) => {
      if (!letter && robotGuess[0]) {
        if (currentPassArray.includes(robotGuessArray[index])) {
          passwords = passwords.filter(password => password.includes(robotGuessArray[index]) && password[index] !== robotGuessArray[index]);
        }
      }
    })
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
      }
    }
  }

  const modeHandle = (event) => {
    if (event.target.innerHTML === "Noob") {
      mode[0] = "Noob";
      setMode([...mode]);
    } else if (event.target.innerHTML === "Clever") {
      mode[0] = "Clever";
      setMode([...mode]);
    } else {
      mode[0] = "Professor";
      setMode([...mode]);
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
      if (robotGuess[0] && robotGuess[0].localeCompare(currentPass) == 0) {
        alert(`you lost :(  password was ${currentPass}`);
        location.reload();
      }
    }
  }

  function handleKeyPress(e) {
    if (turn[0] === "Player") {
      if (e.key == "Backspace") {
        deleteHandler();
      } else if (e.keyCode > 64 && e.keyCode < 91) {
        let playerguess = playerGuess;
        playerguess.push(e.key.toUpperCase());
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
        }
      }
    }
  }

  return (
    <div tabIndex={-1} onKeyDown={handleKeyPress}>
      {!mode[0] && <StartGame modeHandle={modeHandle} />}
      {turn[0] === "Player" ? <div className="player-turn-indicator">Player turn</div> :
        <div className="bot-turn-indicator">Robot turn</div>}
      {allGuesses.length !== 0 && <GuessList
        list={allGuesses}
        correctPlayerGuess={correctPlayerGuess}
        includePlayerGuess={includePlayerGuess} />}
      {turn[0] === "Bot" && <div className="loading-container">
        <Loading />
      </div>}

      <div className='player-insert-container'><PlayerInsertion playerGuess={playerGuess} /></div>
      <div className='keyboard-container'>
        <VirtualKeyboard clickHandler={clickHandler} deleteHandler={deleteHandler} />
      </div>
    </div>
  )
}

export default App
