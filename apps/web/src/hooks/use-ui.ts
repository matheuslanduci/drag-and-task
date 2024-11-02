import type { ReactNode } from 'react'
import { create } from 'zustand'

type UIState = {
	headerActions: ReactNode
	setHeaderActions: (node: ReactNode) => void
}

export const useUI = create<UIState>((set) => ({
	headerActions: null,
	setHeaderActions: (node) => {
		set({ headerActions: node })
	}
}))
