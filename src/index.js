import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//child: is the square. Receives orders from parent (Game)
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  //child: sets up the board. Receives orders from parent (Game)
  class Board extends React.Component {

    //talks to the squares. "value" and "onClick" are props that get passed down to the Square. Passes down the state of the square (null or not) to the child squares.
    renderSquare(i) {
      return <Square value = {this.props.squares[i]} onClick = {() => this.props.onClick(i)}/>;
    }
  
    render() {
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
  
  //parent: Has full control over everything. State is used here, because it is the top-most level.
  class Game extends React.Component {

    //initial set up of board - X is always the first move.
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      };

    }

    //defining the handleClick function, used when a square is clicked. 
    handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      //if calculateWinner is true, ignore the rest
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      //squares are initially set as "X". When the square is clicked, set the state of the square (xIsNext) to be false.
      squares[i] = this.state.xIsNext ? 'X': 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        //when it is not true ("X"), let the next move be false ("O")
      });
  }

    render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
      let status;
      
      if (winner) {
        status = 'Winner' + winner;
      }

      else {
        status = 'Next player:' + (this.state.xIsNext ? 'X':'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board squares = {current.squares} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
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
  