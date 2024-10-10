/* eslint-disable react/prop-types */
import { Button, IconButton } from '@material-tailwind/react'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import React from 'react'

const siblingCount = 2
const boundaryCount = 2

function generateArray(start, length) {
	return Array(length)
		.fill(null)
		.map((e, index) => index + start)
}

function generatePaging(count, active) {
	let pageBtns

	pageBtns = [
		...generateArray(1, boundaryCount),
		null,
		...generateArray(active - siblingCount, siblingCount),
		active,
		...generateArray(active + 1, siblingCount),
		null,
		...generateArray(count - boundaryCount + 1, boundaryCount)
	]

	let set = new Set()
	const nullIndexes = []

	for (let i = 0; i < pageBtns.length; i++) {
		if (pageBtns[i] === null) {
			nullIndexes.push(i)
			continue
		}
		if (pageBtns[i] <= 0) {
			pageBtns[i] = undefined
			continue
		}

		if (set.has(pageBtns[i])) {
			pageBtns[i] = undefined
		} else {
			set.add(pageBtns[i])
		}
	}

	pageBtns = pageBtns.filter(
		number => number !== undefined && number <= count
	)

	for (let i = 0; i < pageBtns.length; i++) {
		if (pageBtns[i] === null) {
			if (pageBtns[i - 1] === pageBtns[i + 1] + 1) {
				pageBtns[i] = undefined
			}

			if (pageBtns[i] === pageBtns[i + 1]) {
				pageBtns[i] = undefined
				pageBtns[i + 1] = undefined
				break
			}
		}
	}

	while (pageBtns[pageBtns.length - 1] === null) {
		pageBtns.pop()
	}

	pageBtns = pageBtns.filter(
		number => number !== undefined && number <= count
	)

	return pageBtns
}

function AppPagination({ count = 1250, currentPage }) {
	const getItemProps = index => ({
		variant: currentPage === index ? 'filled' : 'text',
		color: 'gray'
	})

	let pageBtns = generatePaging(count, currentPage)

	return (
		<div className="flex items-center gap-4">
			<Link
				to={{
					search:
						currentPage <= 1 ? 'page=1' : `page=${currentPage - 1}`
				}}
			>
				<Button
					variant="text"
					className="flex items-center gap-2"
					disabled={currentPage === 1}
				>
					<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{' '}
					Previous
				</Button>
			</Link>
			<div className="flex items-center gap-2">
				{pageBtns.map((num, index) =>
					num !== null ? (
						<Link
							key={index}
							disabled={num === currentPage}
							to={{ search: `page=${num}` }}
						>
							<IconButton {...getItemProps(num)}>
								{num}
							</IconButton>
						</Link>
					) : (
						<IconButton key={index} variant="text">
							...
						</IconButton>
					)
				)}
			</div>
			<Link
				to={{
					search:
						currentPage >= count
							? `page=${count}`
							: `page=${currentPage + 1}`
				}}
			>
				<Button
					variant="text"
					className="flex items-center gap-2"
					disabled={currentPage === count}
				>
					Next
					<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
				</Button>
			</Link>
		</div>
	)
}

export default React.memo(AppPagination)
