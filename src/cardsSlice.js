import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  status: 'loading',
};


export const getCardsAsync = createAsyncThunk(
  'cards/fetchCards',
  async () => {
    try {
      const data = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=100')
        .then((response) => response.json())
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getCardsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCardsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export default cardsSlice.reducer;
