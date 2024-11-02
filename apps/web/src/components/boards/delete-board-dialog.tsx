import type { Board } from '@/db/schema'
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

					<Button type="submit" variant="destructive">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
