import { Progress } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'

function AppProgress() {
	const navigation = useNavigation()
	const [progressValue, setProgressValue] = useState(0)
	useEffect(() => {
		if (navigation.state === 'loading') {
			setProgressValue(20)
		} else if (navigation.state === 'idle' && progressValue > 0) {
			setProgressValue(100)
			setTimeout(() => {
				setProgressValue(0)
			}, 500)
		}
	}, [navigation, progressValue])
	return (
		<Progress
			className={`fixed top-0 z-10 ${progressValue === 0 ? 'invisible' : ''}`}
			barProps={{ className: `transition-all` }}
			size="sm"
			value={progressValue}
		/>
	)
}

export default React.memo(AppProgress)
