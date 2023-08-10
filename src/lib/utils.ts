import { writable } from 'svelte/store';

/** Make a specific set of keys required */
export type SpecificRequired<Type, Key extends keyof Type> = Type & {
	[Property in Key]-?: Type[Property];
};

/**
 * Useful for creating component state that should be remembered even after remounting.
 * @param defaultValue the default value when you initialize, initializing recreates
 * a shallow copy of defaultValue.
 */
export const createStateStore = <T>(defaultValue: T) => {
	const store = writable<{ [id: string]: T }>({});

	/**
	 * @param id
	 * @param override overrides default component values.
	 */
	let initialize = (id: string, override: Partial<T> = {}) => {
		store.update((store) => {
			if (store[id]) return store;
			return {
				...store,
				[id]: { ...defaultValue, ...override }
			};
		});
	};

	return { ...store, initialize };
};
