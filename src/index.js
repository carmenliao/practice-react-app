import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//child
class Square extends React.Component {

    //when the square is clicked, it calls the function associated with onClick (handleClick)
    render() {
      return (
        <button className="square" onClick = {()=> this.props.onClick()}> 
          {this.props.value}
        </button>
      );
    }
  }
  
  //parent 
  class Board extends React.Component {
    //initially, squares are null. board is filled 9 squares
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    //defining the handleClick function, used when a square is clicked. Sets the square to X.
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }

    //talks to the squares. "value" and "onClick" are props that get passed down to the Square. Passes down the state of the square (null or not) to the child squares.
    renderSquare(i) {
      return <Square value = {this.state.squares[i]} onClick = {() => this.handleClick(i)}/>;
    }
  
    render() {
      const status = 'Next player: X';
  
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  