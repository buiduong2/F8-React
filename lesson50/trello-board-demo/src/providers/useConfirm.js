import { createContext, useContext } from 'react'
export const ConfirmContext = createContext()
export default function useConfirm() {
	const { openConfirm } = useContext(ConfirmContext)

	return {
		openConfirm
	}
}
