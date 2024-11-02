import { NewBoardDialog } from '@/components/boards/new-board-dialog'
import { LoadingScreen } from '@/components/loading-screen'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { type Board, boardsTable } from '@/db/schema'
import { useUI } from '@/hooks/use-ui'
import { db } from '@/resources/db'

import { useLiveQuery } from '@electric-sql/pglite-react'
import {
	EllipsisVertical,
	Pencil,
	SquareArrowOutUpRight,
	Trash
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Home() {
	const items = useLiveQuery<Board>(db.select().from(boardsTable).toSQL().sql)
	const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false)

	const setHeaderActions = useUI((state) => state.setHeaderActions)

	useEffect(() => {
		setHeaderActions(
			<>
				<Button onClick={() => setIsCreationDialogOpen(true)}>New Board</Button>

				<NewBoardDialog
					open={isCreationDialogOpen}
					onOpenChange={setIsCreationDialogOpen}
				/>
			</>
		)

		return () => {
			setHeaderActions(null)
		}
	}, [setHeaderActions, isCreationDialogOpen])

	if (!items) {
		return <LoadingScreen />
	}

	return (
		<div className="container mx-auto">
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{items.rows.map((board) => (
					<Card key={board.id}>
						<CardHeader className="flex flex-row items-center justify-between">
							<div className="flex flex-col gap-2">
								<CardTitle>{board.title}</CardTitle>
								<CardDescription>
									Created at: {board.createdAt.toLocaleDateString()}
								</CardDescription>
							</div>

							<div className="flex gap-2">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="outline" asChild size="icon">
											<Link to={`/boards/${board.id}`}>
												<SquareArrowOutUpRight />
											</Link>
										</Button>
									</TooltipTrigger>

									<TooltipContent>Go to board {board.title}</TooltipContent>
								</Tooltip>

								<Tooltip>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<TooltipTrigger asChild>
												<Button variant="ghost" size="icon">
													<EllipsisVertical />
												</Button>
											</TooltipTrigger>
										</DropdownMenuTrigger>

										<TooltipContent>More options</TooltipContent>

										<DropdownMenuContent className="w-56">
											<DropdownMenuLabel>Board {board.title}</DropdownMenuLabel>
											<DropdownMenuSeparator />

											<DropdownMenuGroup>
												<DropdownMenuItem>
													<SquareArrowOutUpRight />

													<span>Go to</span>
												</DropdownMenuItem>

												<DropdownMenuItem>
													<Pencil />

													<span>Edit</span>
												</DropdownMenuItem>

												<DropdownMenuItem className="text-red-500">
													<Trash />

													<span>Delete</span>
												</DropdownMenuItem>
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</Tooltip>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	)
}
