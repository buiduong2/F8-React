export function computeGameRounds(maxRange) {
	return Math.ceil(Math.log2(maxRange))
}

export function computeRangeMarks(maxRange) {
	const markers = [100]

	for (let i = 1; i <= 4; i++) {
		markers.push(Math.floor((maxRange * i) / 4))
	}

	return markers
}

export function generateSecretNumber(maxRange) {
	return Math.floor(Math.random() * maxRange) + 1
}

export function isGuestValid(numberStr, maxNumber) {
	const number = Number(numberStr)
	return (
		(!isNaN(number) && number <= maxNumber && number > 0) ||
		numberStr.length === 0
	)
}

export function calculateCorrectPercent(playTimes, totalTimes, isVictory) {
	let correctTimes = totalTimes - playTimes
	if (isVictory) {
		correctTimes++
	}

	return correctTimes / totalTimes
}
