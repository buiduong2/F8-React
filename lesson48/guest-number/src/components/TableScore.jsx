/* eslint-disable react/prop-types */
import {
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'

import React from 'react'
import { guestResult } from '../hooks/useGame'
import { calculateCorrectPercent } from '../utils/gameUtils'

const rowColors = [
	'green.300',
	'green.200',
	'teal.200',
	'teal.300',
	'yellow.200',
	'yellow.300',
	'orange.300',
	'orange.400',
	'red.500',
	'red.500'
]

function pickColor(index) {
	return rowColors[index % rowColors.length]
}

function TableScore({ rounds, totalRound, playCount, playCurrent }) {
	const correctPercent =
		calculateCorrectPercent(
			rounds.length,
			totalRound,
			rounds.some(round => round.correct === guestResult.RESULT_EQUAL)
		) * 100

	return (
		<TableContainer border="2px" borderRadius="lg">
			<Table variant="simple" size="sm">
				<Thead>
					<Tr>
						<Th fontSize="md" textAlign="center">
							Số lần nhập
						</Th>
						<Th fontSize="md" textAlign="center">
							Số nhập vào
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{rounds.map((round, index) => (
						<Tr key={index}>
							<Td
								fontSize="md"
								textAlign="center"
								color={pickColor(index)}
							>
								{index + 1}
							</Td>
							<Td
								fontSize="md"
								textAlign="center"
								color="red.800"
							>
								{round.guestNumber}
							</Td>
						</Tr>
					))}
				</Tbody>

				<TableCaption fontSize="md">
					Lần chơi thứ: {playCurrent} / {playCount}
				</TableCaption>
				<TableCaption fontSize="md">
					Số lần nhập tối đa:
					<Text color="teal.400" as="label">
						{' ' + totalRound}
					</Text>
				</TableCaption>
				<TableCaption fontSize="md" color="red.700">
					Tỷ lệ đúng: {correctPercent}%
				</TableCaption>
			</Table>
		</TableContainer>
	)
}
export default React.memo(TableScore)
