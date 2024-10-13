import { configureStore } from '@reduxjs/toolkit';
import { displayReducer } from './displaySlice';

const store = configureStore({
  reducer: displayReducer
});

export default store;