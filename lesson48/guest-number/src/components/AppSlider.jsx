/* eslint-disable react/prop-types */
import {
	Box,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Tooltip
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { computeRangeMarks } from '../utils/gameUtils'

export default function AppSlider({ range, ...rest }) {
	const [sliderValue, setSliderValue] = React.useState(Math.floor(range / 2))
	const [showTooltip, setShowTooltip] = React.useState(false)

	const marks = useMemo(() => computeRangeMarks(range), [range])

	return (
		<Box pt={6} pb={10}>
			<Slider
				{...rest}
				id="slider"
				defaultValue={sliderValue}
				min={1}
				max={range}
				colorScheme="teal"
				onChange={v => setSliderValue(v)}
				onMouseOver={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				{marks.map(value => (
					<SliderMark
						value={value}
						mt="1"
						fontSize="lg"
						transform="translateX(-50%)"
						key={value}
					>
						{value}
					</SliderMark>
				))}

				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<Tooltip
					hasArrow
					bg="teal.500"
					color="white"
					placement="top"
					isOpen={showTooltip}
					label={sliderValue}
				>
					<SliderThumb />
				</Tooltip>
			</Slider>
		</Box>
	)
}
