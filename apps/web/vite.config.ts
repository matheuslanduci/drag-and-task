import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	optimizeDeps: {
		exclude: ['@electric-sql/pglite']
	},
	worker: {
		format: 'es'
	}
})
