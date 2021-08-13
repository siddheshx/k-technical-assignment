import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../src/cardsSlice'

export const store = configureStore({
  reducer: {
    cards: cardsReducer
  },
})