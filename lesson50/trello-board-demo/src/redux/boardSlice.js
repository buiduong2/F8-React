import { createSlice } from '@reduxjs/toolkit'
import { updateData } from '../utils/httpClient'
import { debounce } from 'lodash'
import { createError } from './errorSlice'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
	columns: [],
	status: 'idle'
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setStatus(state, { payload }) {
			state.status = payload.status
		},
		setColumns(state, { payload }) {
			state.columns = payload.columns
		},

		addColumn: (state, { payload }) => {
			const { columnName } = payload
			state.columns.push({
				id: uuidv4(),
				name: columnName,
				rows: [
					{
						id: uuidv4(),
						content: 'New Task'
					}
				]
			})
		},

		addTask: (state, { payload }) => {
			const { columnIndex, taskName } = payload

			state.columns[columnIndex].rows.push({
				id: uuidv4(),
				content: taskName
			})
		},

		editColumn: (state, { payload }) => {
			const { columnIndex, columnName } = payload
			state.columns[columnIndex].name = columnName
		},

		editTask: (state, { payload }) => {
			const { columnIndex, taskIndex, taskName } = payload
			state.columns[columnIndex].rows[taskIndex].content = taskName
		},

		removeColumn: (state, { payload }) => {
			const { columnIndex } = payload
			state.columns.splice(columnIndex, 1)
		},

		removeTask: (state, { payload }) => {
			const { columnIndex, taskIndex } = payload
			state.columns[columnIndex].rows.splice(taskIndex, 1)
		},

		moveColumn: (state, { payload }) => {
			const { fromColumnIndex, toColumnIndex } = payload
			let temp = state.columns[fromColumnIndex]

			state.columns[fromColumnIndex] = state.columns[toColumnIndex]
			state.columns[toColumnIndex] = temp
		},

		moveTask: (state, { payload }) => {
			const {
				fromColumnIndex,
				toColumnIndex,
				fromTaskIndex,
				toTaskIndex
			} = payload

			const task = state.columns[fromColumnIndex].rows[fromTaskIndex]
			state.columns[fromColumnIndex].rows.splice(fromTaskIndex, 1)
			state.columns[toColumnIndex].rows.splice(toTaskIndex, 0, task)
		}
	}
})

export const {
	setColumns,
	addColumn,
	addTask,
	editColumn,
	editTask,
	removeColumn,
	removeTask,
	moveColumn,
	moveTask,
	setStatus
} = boardSlice.actions

export default boardSlice.reducer

const debouncedUpdateData = debounce(
	async (columns, store) => {
		try {
			store.dispatch(setStatus({ status: 'loading' }))
			await updateData(columns)
		} catch (error) {
			if (error?.response?.data.code === 401) {
				store.dispatch(
					createError({
						type: 'auth',
						code: 401
					})
				)
			}
		} finally {
			store.dispatch(setStatus({ status: 'idle' }))
		}
	},
	500,
	{
		maxWait: 5000,
	}
)

export const boardMiddleware = store => next => action => {
	const result = next(action)
	const { type } = action
	if (
		type.startsWith('board') &&
		type !== 'board/setColumns' &&
		type !== 'board/setStatus'
	) {
		debouncedUpdateData(store.getState().board.columns, store)
	}
	return result
}
