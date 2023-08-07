import type { Board } from '.';

export function getBoards() {
	const str = localStorage.getItem('boards');
	const boards: Board[] = str ? JSON.parse(str) : [];

	return boards;
}

export function setBoards(boards: Board[]) {
	localStorage.setItem('boards', JSON.stringify(boards));
}
