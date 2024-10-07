import {
	Box,
	Button,
	IconButton,
	Progress,
	useColorMode
} from '@chakra-ui/react'

import { CiDark, CiLight, CiTrash } from 'react-icons/ci'
import AppForm from './components/AppForm'
import AppSlider from './components/AppSlider'
import AppTitle from './components/AppTitle'
import useGame, { gameStates } from './hooks/useGame'
import useGameHistory from './hooks/useGameHistory'
import { useEffect, useState } from 'react'
import TableScoreList from './components/TableScoreList'
function App() {
	const { colorMode, toggleColorMode } = useColorMode()
	const [message, setMessage] = useState(null)

	const gameHistory = useGameHistory()
	const {
		currentState: gameState,
		getStats: getGameStats,
		remainRound,
		totalRound,
		range,
		startNewGame,
		guestNumber
	} = useGame(1024)
	const maxRange = 2048

	const isGameEnded =
		gameState === gameStates.VICTORY || gameState === gameStates.FAILURE

	useEffect(() => {
		return () => {}
	}, [])

	useEffect(() => {
		if (isGameEnded) {
			const stats = getGameStats()
			gameHistory.add(stats)
		}
	}, [gameState])

	function onChangeRangeEnd(number) {
		startNewGame(number)
		setMessage(null)
	}

	function resetGame() {
		if (confirm('Chúng ta chơi lại ván mới nhé')) {
			startNewGame()
			setMessage(null)
		}
	}

	function handleSubmitAns(newNumber) {
		if (isGameEnded) {
			if (confirm('Trò chơi kết thúc rồi. Chúng ta chơi lại nhé')) {
				startNewGame()
				setMessage(null)
			}
		} else {
			const res = guestNumber(newNumber)
			setMessage(res.message)
		}
	}

	return (
		<Box p="10">
			<Progress
				position="fixed"
				top={0}
				left={0}
				right={0}
				value={(remainRound / totalRound) * 100}
				colorScheme="teal"
				size="sm"
			/>

			<div>
				<IconButton
					position={'fixed'}
					right={'12'}
					colorScheme="blue"
					fontSize={'xl'}
					onClick={toggleColorMode}
					aria-label={
						'Change to ' + colorMode === 'dark'
							? 'DarkMode'
							: 'LightMode'
					}
					icon={colorMode === 'dark' ? <CiLight /> : <CiDark />}
					zIndex={999}
				/>
				<IconButton
					position={'fixed'}
					right={'12'}
					top={'24'}
					colorScheme="red"
					fontSize={'xl'}
					onClick={gameHistory.clear}
					icon={<CiTrash />}
					zIndex={999}
				/>
				<AppTitle
					remainRound={remainRound}
					totalRound={totalRound}
					message={message}
					range={range}
				/>
				<AppSlider range={maxRange} onChangeEnd={onChangeRangeEnd} />
				<AppForm
					submit={handleSubmitAns}
					maxNumber={range}
					key={range}
				/>

				{isGameEnded && (
					<Button colorScheme="orange" onClick={resetGame} mb={5}>
						Chơi lại
					</Button>
				)}

				{gameHistory.histories.length > 0 && (
					<TableScoreList gameHistory={gameHistory} />
				)}
			</div>
		</Box>
	)
}
export default App
