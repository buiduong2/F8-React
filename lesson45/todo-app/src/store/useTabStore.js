import { createContext, useContext } from 'react'

export const TabContext = createContext()

export default function useTabStore() {
	const { currentTab, setCurrentTab } = useContext(TabContext)

	function changeTab(name) {
		if (currentTab === name) {
			return
		}
		setCurrentTab(name)
	}

	return {
		changeTab,
		currentTab
	}
}
