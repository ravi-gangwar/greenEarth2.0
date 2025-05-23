import { CartState } from '@/types/TCart';
import { ITree } from '@/types/Ttree';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  checkoutForm: {
    address: "",
    city: "",
    state: "",
    pin: "",
    paymentMethod: "cash",
  },
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ITree>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * (item.quantity || 0),
        0
      );
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action: PayloadAction<ITree>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * (item.quantity || 0),
        0
      );
      state.totalQuantity -= 1;
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * (item.quantity || 0),
          0
        );
      }
    },
    updateCheckoutForm: (state, action: PayloadAction<{ field: keyof CartState["checkoutForm"]; value: string }>) => {
      state.checkoutForm[action.payload.field] = action.payload.value;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.checkoutForm = initialState.checkoutForm;
    },
    getTotal: (state) => {
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    },
  },
})

export const { addToCart, removeFromCart, clearCart, updateQuantity, updateCheckoutForm, getTotal } = cartSlice.actions;

export default cartSlice.reducer;

