import { nanoid } from 'nanoid';
import type { BoardType } from '.';

export function getBoards(): BoardType[] {
	const str = localStorage.getItem('boards');
	const boards: BoardType[] = str
		? JSON.parse(str)
		: [
				{
					name: 'Tasks',
					columns: [
						{ name: 'Todo 📦', items: [], id: nanoid(6) },
						{ name: 'Doing ✍️', items: [], id: nanoid(6) },
						{ name: 'Done ✅', items: [], id: nanoid(6) }
					],
					id: nanoid(6)
				}
		  ];

	return boards;
}

export function setBoards(boards: BoardType[]) {
	localStorage.setItem('boards', JSON.stringify(boards));
}
