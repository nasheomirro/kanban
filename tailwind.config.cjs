import { join } from 'path';
import forms from '@tailwindcss/forms';
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			transitionProperty: {
				'colors-and-transform':
					'color, background-color, border-color, text-decoration-color, fill, stroke, transform'
			}
		}
	},
	plugins: [forms, ...skeleton()]
};
