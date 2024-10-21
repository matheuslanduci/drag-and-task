import { Home } from './routes/home'
import { Root } from './routes/root'

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from 'react-router-dom'

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<Home />} />
		</Route>
	)
)
