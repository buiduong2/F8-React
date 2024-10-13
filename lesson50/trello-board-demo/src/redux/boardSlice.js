import { createSlice } from '@reduxjs/toolkit'
import columns from '../db.json'

import { v4 as uuidv4 } from 'uuid'
const initialState = {
	columns: columns
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
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
	addColumn,
	addTask,
	editColumn,
	editTask,
	removeColumn,
	removeTask,
	moveColumn,
	moveTask
} = boardSlice.actions

export default boardSlice.reducer
