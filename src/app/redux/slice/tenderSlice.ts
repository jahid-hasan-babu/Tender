import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface TenderState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: TenderState = {
    loading: false,
    success: false,
    error: null,
};

// Async thunk for tender form submission
export const submitTenderForm = createAsyncThunk(
    'tender/submitTenderForm',
    async (formData: FormData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; // Get the token from the auth state
            const response = await axios.post(
                'https://your-api-endpoint.com/api/tender-submit',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`, // Attach token in headers
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const tenderSlice = createSlice({
    name: 'tender',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitTenderForm.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitTenderForm.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(submitTenderForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export default tenderSlice.reducer;
