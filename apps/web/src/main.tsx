import './index.css'

import { router } from './router'
import { pg } from './resources/db'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { PGliteProvider } from '@electric-sql/pglite-react'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Root element not found')
}

const reactRoot = createRoot(rootElement)

reactRoot.render(
	<StrictMode>
		<PGliteProvider db={pg}>
			<RouterProvider router={router} />
		</PGliteProvider>
	</StrictMode>
)
