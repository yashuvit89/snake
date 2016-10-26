import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
  static propTypes = {
    snake: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  clickStartGame = () => {
    this.props.actions.startGame()
  }

  clickEndGame = () => {
    this.props.actions.stopGame();
  }

  render() {
    let currentScore = this.props.snake.snakeArr.length - 1
    if(localStorage) {
      let topScore = parseInt(localStorage.getItem('topScore'), 10)
      if(currentScore > topScore) {
        localStorage.setItem('topScore', currentScore)
      }
    }else{
      localStorage.setItem('topScore', 0)
    }
    return (
      <header className="header">
        <h1></h1>
        <button onClick={this.clickStartGame}>Start Game</button>
        <h3>Score: {currentScore}  Top Score: {localStorage.getItem('topScore') || currentScore}</h3>
        <h3>Current direction {this.props.snake.currDir}</h3>
      </header>
    )
  }
}
