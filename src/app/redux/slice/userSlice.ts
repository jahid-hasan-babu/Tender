import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  companyId: string;
  authToken: string | null;
}

const initialState: UserState = {
  email: '',
  companyId: '',
  authToken: null, // Add authToken to state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; companyId: string; authToken: string }>) => {
      state.email = action.payload.email;
      state.companyId = action.payload.companyId;
      state.authToken = action.payload.authToken; // Store token
    },
    clearUser: (state) => {
      state.email = '';
      state.companyId = '';
      state.authToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
