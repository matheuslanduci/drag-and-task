import { boardsTable, type Board } from '@/db/schema'
import { useToast } from '@/hooks/use-toast'
import { db } from '@/resources/db'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'
import { Button } from '../ui/button'

import { eq } from 'drizzle-orm'

type DeleteBoardDialogProps = {
	open: boolean
	onOpenChange: (value: boolean) => void
	board: Board
}

export function DeleteBoardDialog({
	onOpenChange,
	open,
	board
}: DeleteBoardDialogProps) {
	const { toast } = useToast()

	async function deleteBoard() {
		await db.delete(boardsTable).where(eq(boardsTable.id, board.id)).execute()

		toast({
			title: 'Board deleted'
		})
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete board {board.title}?</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this board?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Cancel
						</Button>
					</DialogClose>

					<Button type="submit" variant="destructive" onClick={deleteBoard}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
