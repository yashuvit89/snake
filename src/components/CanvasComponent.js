import React, { Component } from 'react';

export default class CanvasComponent extends Component {

  componentDidMount() {
    const ctx = this.refs.canvas.getContext('2d');
    this.updateCanvas(ctx);
    document.addEventListener('keydown', this.onKeyDown, false)

    setInterval(() => this.props.moveSnake(this.props.keyCode), 500)
  }

  componentDidUpdate() {
    if(this.props.isGameOver) {
      this.props.startGame()
    }
    const ctx = this.refs.canvas.getContext('2d');
    this.updateCanvas(ctx);
  }

  onKeyDown = (e) => {
    const keyCode = e.keyCode
    this.props.moveSnake(keyCode);
    // this.props.keypressed(keyCode);
  }

  updateCanvas(ctx) {
    const N = this.props.N

      // const ctx = this.refs.canvas.getContext('2d');
    ctx.strokeRect(20, 20, 20*N, 20*N);
    ctx.fillStyle = "white";
    ctx.strokeStyle="black";
    ctx.clearRect(20, 20, 20*N, 20*N);
    ctx.fillRect(20, 20, 20*N, 20*N);
    // this.drawPoint(2,0, false, false, ctx)
    this.drawSnake(ctx)

    let foodItem = this.props.foodItem
    if(foodItem) {
      // display food item
      this.drawPoint(foodItem.x, foodItem.y, false, "red", ctx)
    }
    if(this.props.isGenerateFood) {
      this.props.generateFood()
    }
  }

  drawSnake(ctx) {
    this.props.snakeArr.map(point => this.drawPoint(point.x, point.y, false, false, ctx))
  }

  drawPoint(x, y, isClearPoint, color, ctx) {
    // 20, 20 canvas starting x,y
      const X = 20 + (20 * y);
      const Y = 20 + (20 * x);

      if(isClearPoint) {
        ctx.clearRect(X, Y, 20, 20);
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(X, Y, 20, 20);
      }else{
        ctx.fillStyle = color || "black";
        ctx.fillRect(X, Y, 20, 20);
      }
      ctx.save();
  }

  render() {
      return (
        <div>
          <canvas ref="canvas" width={600} height={600} />
        </div>
      );
  }
}
