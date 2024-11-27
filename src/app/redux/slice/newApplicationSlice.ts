import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface NewTender {
    id: number;
    company_name: string;
    identification_number: string;
    email: string;
    phone: string;
    phone2: string;
    address: string;
    country: string;
    town: string;
    province: string;
    sector_of_activity: string;
    created_at: string;
    updated_at: string;
}

interface TendersState {
    tenders: NewTender[];
    loading: boolean;
    error: string | null;
}

const initialState: TendersState = {
    tenders: [],
    loading: false,
    error: null,
};

// Async thunk for fetching tenders
export const fetchTenders = createAsyncThunk<NewTender[], void, { rejectValue: string }>(
    'tenders/fetchTenders',
    async (_, thunkAPI) => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Authentication token not found');
            }

           

            // Fetch request with the Bearer token
            const response = await fetch('https://white-camel-643529.hostingersite.com/api/companies', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to fetch tenders');
            }

            const data = await response.json();
            return data as NewTender[]; // Ensure the returned data matches the NewTender[] structure
        } catch (error) {
            console.error('Fetch tenders failed:', error);
            return thunkAPI.rejectWithValue((error as Error).message);
        }
    }
);

// Slice for tenders
const newApplicationSlice = createSlice({
    name: 'tenders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTenders.fulfilled, (state, action: PayloadAction<NewTender[]>) => {
                state.loading = false;
                state.tenders = action.payload; // Populate tenders with fetched data
            })
            .addCase(fetchTenders.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch tenders';
            });
    },
});

export default newApplicationSlice.reducer;
