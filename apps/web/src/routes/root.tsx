import { AppHeader } from '@/components/app-header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

import { Outlet } from 'react-router-dom'

export function Root() {
	return (
		<ThemeProvider>
			<TooltipProvider>
				<AppHeader />
				<Toaster />
				<div className="container py-4 mx-auto">
					<Outlet />
				</div>
			</TooltipProvider>
		</ThemeProvider>
	)
}
