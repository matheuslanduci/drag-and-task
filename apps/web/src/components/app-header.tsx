import { useUI } from '@/hooks/use-ui'

export function AppHeader() {
	const headerActions = useUI((state) => state.headerActions)

	return (
		<div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between">
				<div>DragAndTask</div>

				{headerActions}
			</div>
		</div>
	)
}
