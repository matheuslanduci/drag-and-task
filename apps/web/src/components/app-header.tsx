import { Button } from './ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './ui/input'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { db } from '@/resources/db'
import { boardsTable } from '@/db/schema'

const formSchema = z.object({
	title: z.string().min(1).max(24)
})

type FormValues = z.infer<typeof formSchema>

export function AppHeader() {
	const form = useForm<FormValues>({
		defaultValues: {
			title: ''
		},
		resolver: zodResolver(formSchema)
	})
	const { toast } = useToast()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	async function onSubmit(values: FormValues) {
		const board = await db
			.insert(boardsTable)
			.values(values)
			.returning()
			.execute()

		console.log('Board created', board)

		toast({
			title: 'Board created'
		})
		setIsDialogOpen(false)
	}

	return (
		<div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between">
				<div>DragAndTask</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>New board</Button>
					</DialogTrigger>

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
			</div>
		</div>
	)
}
