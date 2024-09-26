/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { debounce } from '../utils'

export default function useDebounce(fn, delay) {
	const [debouncedFn] = useState(debounce(fn, delay))
	useEffect(() => () => debouncedFn.clear(), [])
	return debouncedFn
}
