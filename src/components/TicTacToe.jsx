import { useState } from "react";




export default function Game() {
    const [sortedDesc, setSortedDesc] = useState(false);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [sortedMoves, setSortedMoves] = useState(...history);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
  
    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }
  
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Aller au coup #' + move;
      } else {
        description = 'Revenir au début';
      }
  
      if (move === history.length - 1) {
        return (
          <span key={move}>{description}</span>
        );
      }
  
      return (
        <li key={move} >
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
    

    function sortMoves(){
      const listMoves = [...moves];      
      listMoves.sort(function (a, b) {
        return b.key - a.key;
      });

      setSortedDesc(!sortedDesc);
      setSortedMoves(listMoves);
    }

    const { winner, winningSquares } = calculateWinner(currentSquares);
  
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningSquares={winningSquares} />
        </div>
        <div className="game-info">
          <ul>{sortedDesc ? sortedMoves : moves}</ul>
        </div>
        <div className="game-option">
          <button onClick={sortMoves}>Trier mouvements</button>
        </div>
      </div>
    );
  }

function Square({ value, onSquareClick, isWinningSquare }) {
    return (
      <button 
        className={`square ${isWinningSquare ? 'winning-square' : ''}`} 
        onClick={onSquareClick}
      >
        {value}
      </button>
    );
  }
  
  function Board({ xIsNext, squares, onPlay, winningSquares }) {
    function handleClick(i) {
      if (winningSquares.length > 0 || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }
  
    const winner = calculateWinner(squares).winner;
    let status;
    if (winner) {
      status = winner + ' a gagné';
    } else {
      status = 'Prochain tour : ' + (xIsNext ? 'X' : 'O');
    }
    const boardRows = [];
    const size = 3;

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
        const squareIndex = i * size + j;
        row.push(
            <Square
            key={squareIndex}
            value={squares[squareIndex]}
            onSquareClick={() => handleClick(squareIndex)}
            isWinningSquare={winningSquares.includes(squareIndex)}
            />
        );
        }
        boardRows.push(<div key={i} className="board-row">{row}</div>);
    }

  return (
    <>
        <div className="status">{status}</div>
        <div className="board">{boardRows}</div>
    </>
    

  );
    //old
    // return (
    //   <>
    //     <div className="status">{status}</div>
    //     <div className="board-row">
    //       <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
    //       <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
    //       <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    //     </div>
    //     <div className="board-row">
    //       <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
    //       <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
    //       <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    //     </div>
    //     <div className="board-row">
    //       <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
    //       <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
    //       <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    //     </div>
    //   </>
    // );
  }
  
  
  
  function calculateWinner(squares) {
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
        return { winner: squares[a], winningSquares: lines[i] };
      }
    }
    return { winner: null, winningSquares: [] };
  }