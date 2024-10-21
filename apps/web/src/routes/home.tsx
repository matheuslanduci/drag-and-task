import { boardsTable } from '@/db/schema'
import { db } from '@/resources/db'
import { useLiveQuery } from '@electric-sql/pglite-react'

export function Home() {
	const items = useLiveQuery(db.select().from(boardsTable).toSQL().sql)

	console.log(items)

	return <div className="container mx-auto">Hello, world</div>
}
