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
				<Outlet />
			</TooltipProvider>
		</ThemeProvider>
	)
}
