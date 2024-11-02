import { Loader } from 'lucide-react'

export function LoadingScreen() {
	return (
		<div className="w-full h-96 flex items-center justify-center">
			<Loader className="animate-spin" />
		</div>
	)
}
