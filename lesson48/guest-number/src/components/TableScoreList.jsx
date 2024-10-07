/* eslint-disable react/prop-types */
import { Box, Flex } from '@chakra-ui/react'
import TableScore from './TableScore'
import { useEffect, useRef } from 'react'

export default function TableScoreList({ gameHistory }) {
	const containerRef = useRef()

	useEffect(() => {
		function handleOnKeyDown(e) {
			const container = containerRef.current
			if (!(document.activeElement instanceof HTMLInputElement)) {
				if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
					e.preventDefault()
					const { currentIndex, markers } = getScrollInfo(container)
					if (e.key === 'ArrowLeft') {
						scrollNextChild(container, currentIndex - 1, markers)
					} else if (e.key === 'ArrowRight') {
						scrollNextChild(container, currentIndex + 1, markers)
					}
				}
			}
		}
		window.addEventListener('keydown', handleOnKeyDown)

		return () => {
			window.removeEventListener('keydown', handleOnKeyDown)
		}
	}, [])

	return (
		<Flex overflow={'auto'} ref={containerRef}>
			{gameHistory.histories.map((history, index) => (
				<Box width={'full'} height={'full'} flexShrink="0" key={index}>
					<TableScore
						playCount={gameHistory.histories.length}
						playCurrent={gameHistory.histories.length - index}
						totalRound={history.totalRound}
						rounds={history.rounds}
					/>
				</Box>
			))}
		</Flex>
	)
}

function getScrollInfo(container) {
	const scrollLeft = container.scrollLeft
	const totalElement = container.children.length

	const markers = [0]

	for (let i = 1; i < totalElement; i++) {
		markers.push(
			Math.floor(
				(totalElement * container.offsetWidth * i) / totalElement
			)
		)
	}

	let currentIndex = markers.findIndex(marker => marker > scrollLeft + 20)
	currentIndex--

	if (currentIndex <= -1) {
		currentIndex = markers.length - 1
	}

	return {
		currentIndex,
		markers
	}
}

function scrollNextChild(parentElement, currentIndex, markers) {
	let left = 0
	if (currentIndex === -1) {
		currentIndex = markers.length - 1
	} else if (currentIndex >= markers.length) {
		currentIndex = 0
	}

	left = markers[currentIndex]

	parentElement.scrollTo({
		left: left,
		behavior: 'smooth'
	})
}
