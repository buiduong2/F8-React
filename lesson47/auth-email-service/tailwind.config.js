/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
	content: ['./src/**/*.{html,js,jsx}', 'index.css'],
	theme: {
		extend: {}
	},
	plugins: []
})