import React, { useState, useRef, useEffect } from 'react';
import getPredictions from './api';
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [numClicks, setNumClicks] = useState(0);

  const resetGame = () => {
    setGameOver(false);
    setNumClicks(0);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    aiTurn.current = false
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const aiMakesMove = async () => {
    let numpyArr = []
    for (let key in squares) {
      const el = squares[key]
      if (el === 'X') {
        numpyArr.push(1)
      }
      else if (el === 'O') {
        numpyArr.push(-1)
      }
      else {
        numpyArr.push(0)
      }
    }
    const res_ = await getPredictions(numpyArr)
    handleClick(res_['mpc.pkl'])
  }

  const firstUpdate = useRef(true);
  const aiTurn = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
    }
    else if (aiTurn.current) {
      aiMakesMove()
      aiTurn.current = false
    }
    else {
      aiTurn.current = true
    }
  }, [squares])

  const handleClick = async (i) => {
    if (!gameOver) {
      const newSquares = [...squares];
      if (newSquares[i]) {
        return;
      }
      newSquares[i] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
      setNumClicks(numClicks + 1)
      if (calculateWinner(newSquares)) {
        setGameOver(true);
        return;
      }
      if (numClicks === 8) {
        setGameOver(true);
      }
    } else {
      alert("Game over. Please reset")
    }
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {squares[i]}
    </button>
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (numClicks === 9) {
    status = "Tie Game"
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        {gameOver && (
          <button onClick={resetGame}>Reset Game</button>
        )}
      </div>
    </div>
  );
}

export default App;
