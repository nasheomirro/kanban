import type { BoardType } from '.';

export function getBoards(): BoardType[] {
	const str = localStorage.getItem('boards');
	const boards: BoardType[] = str ? JSON.parse(str) : [];

	return boards;
}

export function setBoards(boards: BoardType[]) {
	localStorage.setItem('boards', JSON.stringify(boards));
}
