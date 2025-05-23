import { TUser } from "@/types/TUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState extends Partial<TUser> {
    token: string;
}

const initialState: UserState = {
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    avatar: "",
    token: "",
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.isAdmin = false;
      state.avatar = "";
      state.token = "";
    },
    updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
      state = { ...state, ...action.payload };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
})

export const { setUser, clearUser, updateUser, setToken } = userSlice.actions;

export default userSlice.reducer;

