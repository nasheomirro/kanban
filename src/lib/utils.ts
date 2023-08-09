/** Make a specific set of keys required */
type SpecificRequired<Type, Key extends keyof Type> = Type & {
	[Property in Key]-?: Type[Property];
};
