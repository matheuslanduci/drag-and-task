import { AppHeader } from '@/components/app-header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import { Outlet } from 'react-router-dom'

export function Root() {
	return (
		<ThemeProvider>
			<AppHeader />
			<Toaster />
			<Outlet />
		</ThemeProvider>
	)
}
