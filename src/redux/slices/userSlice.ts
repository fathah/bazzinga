import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  name: null,
  userId: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.userId = action.payload.userId
    },
    clearUser(state) {
      state.token = null;
      state.name = null;
      state.userId = null
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;