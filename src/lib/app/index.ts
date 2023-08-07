import { writable } from 'svelte/store';
import { getBoards, setBoards } from './storage';

export type Board = {
	readonly id: string;
	name: string;
	columns: Column[];
};

export type Column = {
	readonly id: string;
	name: string;
	items: Item[];
};

export type Item = {
	readonly id: string;
	name: string;
	description: string;
};

function createStore() {
	const { subscribe, update } = writable<Board[]>(getBoards());
	subscribe((boards) => {
		setBoards(boards);
	});

	const addBoard = (board: Board) => {
		update((boards) => [...boards, board]);
	};
	const updateBoard = (board: Partial<Board>) => {
		update((boards) =>
			boards.map((_board) => (_board.id === board.id ? { ..._board, ...board } : _board))
		);
	};
	const deleteBoard = (boardId: string) => {
		update((boards) => boards.filter((board) => board.id !== boardId));
	};

	return { subscribe, addBoard, updateBoard, deleteBoard };
}

export const store = createStore();
