import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../slices/StockSlice';

const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export default store;
