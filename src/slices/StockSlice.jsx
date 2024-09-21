import { createSlice } from '@reduxjs/toolkit';
import CarStock from "../data/stock.json";

const initialState = {
  products: CarStock,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, stock } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) product.stock = stock;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    reduceStock: (state, action) => {
      const { id, quantity } = action.payload;
      console.log(id, quantity,"id ve quantity");
      const product = state.products.find((product) => product.id === id);
      if (product && product.stock >= quantity) product.stock -= quantity;
    },
    increaseStock: (state, action) => {
      const { id, quantity } = action.payload;
      console.log(id, quantity,"id ve quantity");
      const product = state.products.find((product) => product.id === id);
      if (product && product.stock >= quantity) product.stock += quantity;
    },
    
} });

export const { addProduct, updateProduct, removeProduct, reduceStock,increaseStock } = stockSlice.actions;
export default stockSlice.reducer;
