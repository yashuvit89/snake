import * as types from '../constants/ActionTypes'

export function startGame(){
	return { type: types.START_GAME}
}

export function stopGame() {
	return { type: types.STOP_GAME}
}

export function moveSnake(keyCode) {
	return { type: types.MOVE_SNAKE, keyCode }
}

export function updateRows(num) {
	return { type: types.UPDATE_ROWS, num }
}

export function generateFood() {
	return { type: types.GENERATE_FOOD }
}

export function keypressed(keyCode) {
	return { type: types.KEY_PRESSED , keyCode }
}
