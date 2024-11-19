import { PGlite } from '@electric-sql/pglite'
import { live } from '@electric-sql/pglite/live'
import { drizzle } from 'drizzle-orm/pglite'

export const pg = new PGlite({
	extensions: {
		live
	},
	dataDir: 'idb://drag-and-task'
})

export const db = drizzle({ client: pg })

const migrations = ['/drizzle/0000_initial_schema.sql']

async function migrate() {
	for (const migrationFile of migrations) {
		const response = await fetch(migrationFile)

		const sql = await response.text()

		await pg.exec(sql)
	}
}

migrate()
