import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface allMembres {
    id: number;
    role: string;
    company_id: number;
    password: string;
    email: string;
    email_verified_at: string;
    profile_photo_path: number;
    created_at: string;
    updated_at: string;
    company: {
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
    }[];
}

interface TendersState {
    tenders: allMembres[];
    loading: boolean;
    error: string | null;
}

const initialState: TendersState = {
    tenders: [],
    loading: false,
    error: null,
};



export const fetchTenders = createAsyncThunk(
    'tenders/fetchTenders',
    async (_, thunkAPI) => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Authentication token not found');
            }
            console.log(token);

            // Make the fetch request with the Bearer token
            const response = await fetch('https://white-camel-643529.hostingersite.com/api/users', {
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

            // Parse and return the response JSON
            return await response.json();
          
        } catch (error) {
            console.error('Fetch tenders failed:', error);
            return thunkAPI.rejectWithValue((error as Error).message);
        }
    }
);


const allMembersSlice = createSlice({
    name: 'tenders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTenders.fulfilled, (state, action) => {
                state.loading = false;
                state.tenders = action.payload;
            })
            .addCase(fetchTenders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tenders';
            });
    },
});

export default allMembersSlice.reducer;
      