import { writable } from 'svelte/store';
import { getBoards, setBoards } from './storage';

export type BoardType = {
	readonly id: string;
	name: string;
	columns: ColumnType[];
};

export type ColumnType = {
	readonly id: string;
	name: string;
	items: ItemType[];
};

export type ItemType = {
	readonly id: string;
	name: string;
	description: string;
};

function createStore() {
	const boards = getBoards();

	const { subscribe, update } = writable<{
		id: string;
		boards: BoardType[];
	}>({
		boards,
		id: boards[0]?.id || ''
	});
	subscribe((store) => {
		setBoards(store.boards);
	});

	const setCurrent = (id: string) => {
		update((store) => ({ ...store, id }));
	};

	const addBoard = (board: BoardType) => {
		update(({ boards, ...store }) => ({ ...store, boards: [...boards, board] }));
	};
	const updateBoard = (board: Partial<BoardType>) => {
		update(({ boards, ...store }) => ({
			...store,
			boards: boards.map((_board) => (_board.id === board.id ? { ..._board, ...board } : _board))
		}));
	};
	const deleteBoard = (boardId: string) => {
		update(({ boards, id, ...store }) => {
			// handle switching current when deleting a board
			if (boardId === id) {
				if (boards.length === 1) {
					id = '';
				} else {
					let i = boards.findIndex((board) => board.id === boardId);
					i += boards.length - 1 === i ? -1 : 1;
					id = boards[i].id || '';
				}
			}

			return {
				...store,
				id,
				boards: boards.filter((board) => board.id !== boardId)
			};
		});
	};

	const addColumn = (board: BoardType, column: ColumnType) => {
		updateBoard({ ...board, columns: [...board.columns, column] });
	};
	const updateColumn = (board: BoardType, column: Partial<ColumnType>) => {
		updateBoard({
			...board,
			columns: board.columns.map((col) => (col.id === column.id ? { ...col, ...column } : col))
		});
	};
	const deleteColumn = (board: BoardType, columnId: string) => {
		updateBoard({ ...board, columns: board.columns.filter((col) => col.id !== columnId) });
	};

	const addItem = (board: BoardType, column: ColumnType, item: ItemType) => {
		updateColumn(board, { ...column, items: [...column.items, item] });
	};
	const updateItem = (board: BoardType, column: ColumnType, item: Partial<ItemType>) => {
		updateColumn(board, {
			...column,
			items: column.items.map((_item) => (item.id === _item.id ? { ..._item, ...item } : _item))
		});
	};
	const deleteItem = (board: BoardType, column: ColumnType, itemId: string) => {
		updateColumn(board, { ...column, items: column.items.filter((_item) => _item.id !== itemId) });
	};

	return {
		subscribe,
		setCurrent,
		addBoard,
		updateBoard,
		deleteBoard,
		addColumn,
		deleteColumn,
		updateColumn,
		addItem,
		updateItem,
		deleteItem
	};
}

export const store = createStore();
