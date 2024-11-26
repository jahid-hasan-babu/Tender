import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface AuthState {
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch('https://white-camel-643529.hostingersite.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include this for cookies
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorText = await response.text(); // Fetch error response text
        throw new Error(errorText || 'Failed to login');
      }

      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Successfully logged-in user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
