import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
// eslint-disable-next-line no-undef
const env = loadEnv('all', process.cwd())
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	base: env.VITE_BASE_URL || ''
})
