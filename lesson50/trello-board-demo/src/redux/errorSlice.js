import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearInfo } from './authSlice'
import { setColumns } from './boardSlice'

const initialState = {
	message: null,
	code: null,
	type: null
}

export const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		createError(state, { payload }) {
			const { code, type } = payload
			if (type === 'board' && code === 400) {
				state.message = `Có vẻ như dữ liệu của bạn đến từ một trang web khác. không phù hợp với chúng tôi. 
                    Chúng tôi sẽ xóa hết các dữ liệu cũ.
                    Nếu đồng ý chọn OK !`
			} else if (type === 'auth' && code === 401) {
				state.message =
					'Có vẻ như Tài khoản của bạn đã hết hạn. Mời đăng nhập lại'
			}
			state.code = payload.code
			state.type = payload.type
		}
	},
	extraReducers: builder => {
		builder
			.addCase(resolveError.fulfilled, state => {
				state.code = null
				state.message = null
				state.type = null
			})
			.addCase(rejectError.fulfilled, state => {
				state.code = null
				state.message = null
				state.type = null
			})
	}
})

export const resolveError = createAsyncThunk(
	'resolveError',
	async (payload, store) => {
		const { code, type, navigate } = payload

		if (code === 400 && type === 'board') {
			store.dispatch(setColumns({ columns: [] }))
			return true
		}

		if (code === 401 && type === 'auth') {
			store.dispatch(clearInfo())
			navigate('/login')
			return true
		}
	}
)

export const rejectError = createAsyncThunk(
	'rejectError',
	({ navigate }, store) => {
		store.dispatch(clearInfo())
		navigate('/login')
	}
)

export const { createError } = errorSlice.actions

export default errorSlice.reducer
