import { LoadingScreen } from '@/components/loading-screen'
import { Button } from '@/components/ui/button'
import { type Board, boardsTable, type List, listsTable } from '@/db/schema'
import { useUI } from '@/hooks/use-ui'
import { db } from '@/resources/db'

import { useLiveQuery } from '@electric-sql/pglite-react'
import { eq } from 'drizzle-orm'
import { EllipsisVertical, Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export function BoardPage() {
	const { id } = useParams<{ id: string }>()
	const setHeaderActions = useUI((state) => state.setHeaderActions)

	const boardResult = useLiveQuery<Board>(
		db.select().from(boardsTable).where(eq(boardsTable.id, '?')).toSQL().sql,
		[id]
	)
	const listsResult = useLiveQuery<List>(
		db.select().from(listsTable).where(eq(listsTable.boardId, '?')).toSQL().sql,
		[id]
	)

	const board = boardResult?.rows[0]
	const lists = listsResult?.rows

	useEffect(() => {
		setHeaderActions(
			<>
				<h1>{board?.title}</h1>
				<Button asChild variant="outline">
					<Link to="/">Go back</Link>
				</Button>
			</>
		)

		return () => {
			setHeaderActions(null)
		}
	}, [setHeaderActions, board])

	if (!boardResult || !listsResult) {
		return <LoadingScreen />
	}

	return (
		<div className="flex gap-4">
			{lists?.map((list) => (
				<div className="w-full max-w-72 flex flex-col gap-2" key={list.id}>
					<div className="w-full border border-border border-solid px-4 py-2 rounded text-sm flex justify-between items-center">
						{list.title}

						<Button variant="ghost" size="icon-sm">
							<EllipsisVertical />
						</Button>
					</div>

					<div className="flex flex-col gap-2">
						<Button variant="outline" className="w-full h-7">
							<Plus className="!w-3 !h-3" />
						</Button>
					</div>
				</div>
			))}
			<div className="w-full max-w-72 flex flex-col gap-2">
				<Button variant="outline" className="w-full h-[50px]">
					<Plus className="!w-3 !h-3" />
				</Button>
			</div>
		</div>
	)
}
