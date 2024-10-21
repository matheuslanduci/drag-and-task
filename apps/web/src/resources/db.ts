import { live } from '@electric-sql/pglite/live'
import { PGliteWorker } from '@electric-sql/pglite/worker'
import { drizzle } from 'drizzle-orm/pglite'

export const pg = await PGliteWorker.create(
	new Worker(new URL('./db-worker.ts', import.meta.url), {
		type: 'module'
	}),
	{
		extensions: {
			live
		},
		dataDir: 'idb://drag-and-task'
	}
)

// @ts-ignore -- the type of PGliteWorker is different
export const db = drizzle({ client: pg })

const migrations = ['/drizzle/0000_initial_schema.sql?raw']

async function migrate() {
	for (const migrationFile of migrations) {
		const response = await fetch(migrationFile)

		const sql = await response.text()

		await pg.exec(sql)
	}
}

migrate()
