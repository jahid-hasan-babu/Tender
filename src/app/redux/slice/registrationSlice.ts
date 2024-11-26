import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegistrationState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: RegistrationState = {
    loading: false,
    success: false,
    error: null,
};

// Async thunk for form submission
export const submitForm = createAsyncThunk(
    'registration/submitForm',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://white-camel-643529.hostingersite.com/api/submit-form',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        //  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                }
            );
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitForm.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitForm.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(submitForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export default registrationSlice.reducer;
