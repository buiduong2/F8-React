/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'
export default withMT({
	content: [
		'./index.html', // <= add this
		'./src/**/*.{js,ts,jsx,tsx}' // <= no spaces
	],
	theme: {
		extend: {}
	},
	plugins: []
})
