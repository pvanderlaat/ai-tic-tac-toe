import React, { useState } from 'react';
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

  const handleClick = (i) => {
    if (!gameOver) {
      const newSquares = [...squares];
      if (calculateWinner(newSquares) || newSquares[i]) {
        setGameOver(true);
        return;
      }
      newSquares[i] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
      setNumClicks(numClicks + 1)
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
