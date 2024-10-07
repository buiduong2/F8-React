import { useEffect, useRef, useState } from 'react'
import { generateSecretNumber, computeGameRounds } from '../utils/gameUtils'
import { useToast } from '@chakra-ui/react'
export const gameStates = {
	NEW: 1,
	PLAYING: 2,
	FAILURE: 3,
	VICTORY: 4
}

export const guestResult = {
	RESULT_HIGHER: 1,
	RESULT_LOWER: 2,
	RESULT_EQUAL: 3,
	INVALID: 4,
	OUT_OF_ROUND: 5
}

export default function useGame(initalRange) {
	const toast = useToast()
	const [range, setRange] = useState(initalRange)
	const [remainRound, setRemainRound] = useState(0)
	const secretNumber = useRef(0)
	const roundHistory = useRef([])
	const totalRound = useRef(0)
	const [gameState, setGameState] = useState(gameStates.NEW)

	useEffect(() => {
		startNewGame()
	}, [])

	function nextRound() {
		setRemainRound(prev => {
			if (prev === 1) {
				setGameState(gameStates.FAILURE)
			}
			return prev - 1
		})
	}

	function guestNumber(number) {
		const result = validate(number)

		switch (result.correct) {
			case guestResult.RESULT_EQUAL:
				updateRoundHistory(result.correct, number)
				setGameState(gameStates.VICTORY)
				toast({
					title: 'Chính xác',
					description: result.message,
					status: 'success'
				})
				break
			case guestResult.RESULT_HIGHER:
			case guestResult.RESULT_LOWER:
				toast({
					title: 'Chưa chính xác',
					description: result.message,
					status: 'info'
				})
				setGameState(gameStates.PLAYING)
				updateRoundHistory(result.correct, number)
				nextRound()
				break

			case guestResult.OUT_OF_ROUND:
				toast({
					title: 'Thất bại',
					description: result.message,
					status: 'error'
				})
				setGameState(gameStates.FAILURE)
				break
			case guestResult.INVALID:
				toast({
					title: 'Không Hợp lệ',
					description: result.message,
					status: 'error'
				})
				break
			default:
				break
		}

		return result
	}

	function validate(number) {
		const isGameEnded =
			gameState === gameStates.FAILURE || gameState === gameStates.VICTORY
		if (isGameEnded) {
			return {
				correct: guestResult.INVALID,
				message: 'Trò chơi đã kết thúc rồi bạn tôi ơi'
			}
		}
		const isOutOfRound = remainRound === 0
		if (isOutOfRound || isGameEnded) {
			return {
				correct: guestResult.OUT_OF_ROUND,
				message: 'Hmm... Hết lượt chơi rồi bạn tôi ơi'
			}
		}

		const isNumberUsed = roundHistory.current.some(
			round => round.guestNumber === number
		)

		if (isNumberUsed) {
			return {
				correct: guestResult.INVALID,
				message: 'Hmm... Bạn đã sử dụng con số này rồi'
			}
		}

		if (secretNumber.current > number) {
			return {
				correct: guestResult.RESULT_HIGHER,
				message: 'Hmm... Bạn cần tăng một chút'
			}
		} else if (secretNumber.current < number) {
			return {
				correct: guestResult.RESULT_LOWER,
				message: 'Hmm... Bạn cần giảm một chút'
			}
		} else {
			return {
				correct: guestResult.RESULT_EQUAL,
				message: 'Chính xác... tuyệt vời bạn đã đoán đúng'
			}
		}
	}

	function updateRoundHistory(correct, guestNumber) {
		roundHistory.current.push({
			roundNumber: roundHistory.current.length,
			guestNumber,
			correct
		})
	}

	function startNewGame(newRange) {
		if (newRange) {
			setRange(newRange)
		} else {
			newRange = range
		}
		toast({
			title: 'Game start.',
			description: 'Bắt đầu trận đấu mới',
			status: 'success'
		})
		secretNumber.current = generateSecretNumber(newRange)
		roundHistory.current = []
		totalRound.current = computeGameRounds(newRange)
		setRemainRound(totalRound.current)
		setGameState(gameStates.NEW)
		console.log('secret: ' + secretNumber.current)
	}

	function getStats() {
		return {
			rounds: roundHistory.current,
			totalRound: totalRound.current
		}
	}

	return {
		remainRound,
		get totalRound() {
			return totalRound.current
		},
		range,
		currentState: gameState,
		nextRound,
		guestNumber,
		startNewGame,
		getStats
	}
}
