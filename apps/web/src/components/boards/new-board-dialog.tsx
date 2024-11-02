import { useToast } from '@/hooks/use-toast'
import { boardsTable } from '@/db/schema'
import { db } from '@/resources/db'

import { Button } from '../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type NewBoardDialogProps = {
	open: boolean
	onOpenChange: (value: boolean) => void
}

const formSchema = z.object({
	title: z.string().min(1).max(24)
})

type FormValues = z.infer<typeof formSchema>

export function NewBoardDialog({ onOpenChange, open }: NewBoardDialogProps) {
	const form = useForm<FormValues>({
		defaultValues: {
			title: ''
		},
		resolver: zodResolver(formSchema)
	})
	const { toast } = useToast()

	async function onSubmit(values: FormValues) {
		await db.insert(boardsTable).values(values).returning().execute()

		toast({
			title: 'Board created'
		})
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<Form {...form}>
					<DialogHeader>
						<DialogTitle>Create a new board</DialogTitle>
						<DialogDescription>Create a new board</DialogDescription>
					</DialogHeader>

					<form id="create-board" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>

									<FormControl>
										<Input {...field} type="text" />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</form>

					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>

						<Button form="create-board" type="submit">
							Create
						</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
