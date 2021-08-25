import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//child
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  //parent: sets up the board
  class Board extends React.Component {
    //initially, squares are null. board is filled 9 squares
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            //makes the first move always an "X"
        };
    }

    //defining the handleClick function, used when a square is clicked. 
    handleClick(i) {
        const squares = this.state.squares.slice();

        //if calculateWinner is true, ignore the rest
        if (calculateWinner(squares) || squares[i]) {
          return;
        }

        //squares are initially set as "X". When the square is clicked, set the state of the square (xIsNext) to be false.
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
          //when it is not true ("X"), let the next move be false ("O")
        });
    }

    //talks to the squares. "value" and "onClick" are props that get passed down to the Square. Passes down the state of the square (null or not) to the child squares.
    renderSquare(i) {
      return <Square value = {this.state.squares[i]} onClick = {() => this.handleClick(i)}/>;
    }
  
    render() {
    //displays the entire UI.

      const winner = calculateWinner(this.state.squares);
      let status;

      if (winner) {
        status = 'Winner' + winner;
      }

      else {
        status = 'Next player:' + (this.state.xIsNext ? 'X':'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
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
        return squares[a];
      }
    }
    return null;
    //returns null if there is no winner
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  