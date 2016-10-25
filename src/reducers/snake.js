import { START_GAME, STOP_GAME, MOVE_SNAKE, GENERATE_FOOD} from '../constants/ActionTypes'

/**
 *
Assumptions in snake's grid element value
0 - Empty
1 - Snake part exists
2 - Food item

 */

// TODO: extract to data/state folder
let N = 20;
let foodX = Math.floor(Math.random() * N);
let foodY = Math.floor(Math.random() * N);
let gridArr = getInitialGrid();

function getInitialGrid() {
  let grid = [];
  for (let i=0; i<N; i++) {
   grid[i]= [];
   for (let j=0; j<N; j++) {
     grid[i][j]=0;
   }
 }
 //snake default value
 grid[0][0] = 1
 grid[foodX][foodY] = 2
 return grid;
}

let initialState = {
  score: 0,
  text: "Start Game",
  currDir: "RIGHT",
  N: N, //rows
  head: {x: 0, y:0}, // initial head
  snakeArr: [{x: 0, y:0}], // intial snake
  grid: gridArr,
  isGameOver: false,
  foodItem: {x: foodX, y: foodY},
  isGenerateFood: false,
  keyCode: 39
}

export default function snake(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return initialState
    case STOP_GAME:
      return initialState
    case MOVE_SNAKE:
      return snakeBody(state, action)
    case GENERATE_FOOD:
      // TODO: not a good practice to generate random behavior as it violates pure func, extract to Utils
      var x = Math.floor(Math.random() * state.N);
      var y = Math.floor(Math.random() * state.N);

      if(state.grid[x][y] === 1) {
        // food generated on snake
        return Object.assign({}, state, {
          isGenerateFood: true
        })
      }else{
        // grid[x][y] = 2;
        let currentGridRow = state.grid.slice(x, x + 1)[0]
        currentGridRow[y] = 2
        return Object.assign({}, state, {
          isGenerateFood: false,
          grid: [
            ...state.grid.slice(0, x), // prev to current index row
            currentGridRow, // current row
            ...state.grid.slice(x + 1) // next to current index row
          ],
          foodItem: Object.assign({}, state.foodItem, {
            x: x,
            y: y
          }),
        })
      }
    default:
      return state
  }
}

function snakeBody(state = {}, action) {
  switch (action.type) {
    case MOVE_SNAKE:
      const keyCode = action.keyCode
      const x = state.head.x
      const y = state.head.y
      const grid = state.grid
      let currDir = state.currDir
      let isGameOver = false
      let detachedPoint
      let newSnakeArr = []
      let newGrid
      let isGenerateFood = false
      let currentGridRow, currentDetachedRow
      let point = {}

      // Handling all arrow keys
      if(keyCode === 37 && currDir !== "RIGHT") {
        currDir = "LEFT"
        if(y > 0){
          point.x = x;
          point.y = y - 1;
        }else{
          isGameOver = true;
        }
      }else if(keyCode === 38 && currDir !== "DOWN") {
        currDir = "UP"
        if(x > 0){
          point.x = x - 1;
          point.y = y;
        }else{
          isGameOver = true
        }
      }else if(keyCode === 39 && currDir !== "LEFT") {
        currDir = "RIGHT"
        if(y < grid.length -1){
          point.x = x;
          point.y = y + 1;
        }else {
          isGameOver = true
        }
      }else if(keyCode === 40 && currDir !== "UP") {
        currDir = "DOWN"
        if(x < grid.length -1){
          point.x = x + 1;
          point.y = y;
        }else{
          isGameOver = true
        }
      }else{
        // reverse of the head direction is pressed
        return state
      }

      // Game over
      if(isGameOver) {
        return Object.assign({}, initialState, {
          grid: getInitialGrid()
        })
      }

      // Check for collision, food or snake next movement
      if(grid[point.x][point.y] === 1){
        // collision
        isGameOver = true
        return Object.assign({}, initialState, {
          grid: getInitialGrid()
        })
        // trigger action to stop game
      }else if(grid[point.x][point.y] !== 2) {
        // no food available, just proceed to next point
        detachedPoint = state.snakeArr.slice(0, 1)[0]; // Detach first element
        newSnakeArr = [
          ...state.snakeArr.slice(1),
          point
        ]
        currentDetachedRow = state.grid.slice(detachedPoint.x, detachedPoint.x + 1)[0]
        currentDetachedRow[detachedPoint.y] = 0
        // grid[detachedPoint.x][detachedPoint.y] = 0;
        // drawPoint(detachedPoint.x, detachedPoint.y, true);
        newGrid = [
          ...state.grid.slice(0, detachedPoint.x), // prev to current index row
          currentDetachedRow, // current row
          ...state.grid.slice(detachedPoint.x + 1) // next to current index row
        ]

      }else{
        // found food
        newSnakeArr = [
          ...state.snakeArr,
          point
        ]
        isGenerateFood = true
        // displayGrid()
      }

      // grid[point.x][point.y] = 1
      if(newGrid) {
        currentGridRow = newGrid.slice(point.x, point.x + 1)[0]
      }else{
        currentGridRow = state.grid.slice(point.x, point.x + 1)[0]
      }
      currentGridRow[point.y] = 1

      newGrid = [
        ...state.grid.slice(0, point.x), // prev to current index row
        currentGridRow, // current row
        ...state.grid.slice(point.x + 1) // next to current index row
      ]

      const newState = Object.assign({}, state, {
        currDir,
        head: Object.assign({}, state.head, {
          x: point.x,
          y: point.y
        }),
        snakeArr: newSnakeArr,
        grid: newGrid,
        isGameOver,
        detachedPoint,
        isGenerateFood,
        keyCode
      })

      return newState
    default:
      return state
  }
}
