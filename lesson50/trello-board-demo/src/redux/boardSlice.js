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
				rows: []
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
		}
	}
})

export const {
	addColumn,
	addTask,
	editColumn,
	editTask,
	removeColumn,
	removeTask
} = boardSlice.actions

export default boardSlice.reducer
