/* eslint-disable react/prop-types */
import { Heading } from '@chakra-ui/react'
export default function AppTitle({
	remainRound,
	totalRound,
	min = 0,
	range,
	message
}) {
	return (
		<>
			<Heading color="teal.500" as="h2">
				{message || 'Chào mừng bạn đến với trò chơi đoán số'}
			</Heading>
			<Heading color="teal.600" as="h2">
				Còn {remainRound}/{totalRound} Lần
			</Heading>
			<Heading color="teal.500" as="h2">
				Bạn cần tìm kiếm một số từ {min} đến {range}
			</Heading>
		</>
	)
}
