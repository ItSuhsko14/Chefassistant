import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
	const { data } = await axios.get('/cards')
	return data;
})



const initialState = {
	cards: {
		items: [],
		status: 'loading',
	}
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducer: {},
	extraReducers: {
		[fetchCards.pending]: (state, action) => {
			state.cards.items = [];
			state.cards.status = 'loading';
		},
		[fetchCards.fulfilled]: (state, action) => {
			state.cards.items = action.payload;
			state.cards.status = 'loaded';
		},
		[fetchCards.rejected]: (state) => {
			state.cards.items = [];
			state.cards.status = 'error';
		}
	}
})

export const cardReducer = cardsSlice.reducer;