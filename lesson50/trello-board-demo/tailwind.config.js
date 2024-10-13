/** @type {import('tailwindcss').Config} */
import ts from 'tailwind-scrollbar'
export default {
	content: ['./src/**/*.{html,js,jsx}', 'index.html'],
	theme: {
		extend: {
			colors: {
				pink: {
					550: '#CD5A91'
				}
			},
			boxShadow: {
				blue: 'inset 0 0 0 2px var(--ds-border-focused,#388bff)'
			}
		}
	},
	plugins: [ts]
}
