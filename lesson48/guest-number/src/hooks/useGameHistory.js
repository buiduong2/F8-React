import { useState } from 'react'

export default function useGameHistory() {
	const [histories, setHistories] = useState(
		JSON.parse(localStorage.getItem('game-history')) || []
	)

	function clear() {
		setHistories([])
		localStorage.removeItem('game-history')
	}

	function add({ rounds, totalRound }) {
		setHistories(prev => {
			const newHistory = [
				{
					rounds,
					totalRound
				},
				...prev
			]
			localStorage.setItem('game-history', JSON.stringify(newHistory))
			return newHistory
		})
	}

	return {
		clear,
		add,
		histories
	}
}
