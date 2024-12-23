import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dialect: 'postgresql',
	driver: 'pglite',
	schema: './src/db/schema.ts',
	out: './public/drizzle'
})
