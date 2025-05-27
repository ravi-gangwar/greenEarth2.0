import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  forgotPasswordTimer: number | null;
}

const initialState: TimerState = {
  forgotPasswordTimer: null,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setForgotPasswordTimer: (state, action: PayloadAction<number | null>) => {
      state.forgotPasswordTimer = action.payload;
    },
  },
});

export const { setForgotPasswordTimer } = timerSlice.actions;
export default timerSlice.reducer; 