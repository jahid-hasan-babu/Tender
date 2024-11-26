import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Tender {
    id: number;
    tender_number: string;
    title: string;
    department: string;
    start_date: string;
    closing_date: string;
    active_status: number;
    created_at: string;
    updated_at: string;
    tender_pdfs: {
        id: number;
        tender_id: number;
        pdf: string;
        created_at: string;
        updated_at: string;
    }[];
}

interface TendersState {
    tenders: Tender[];
    loading: boolean;
    error: string | null;
}

const initialState: TendersState = {
    tenders: [],
    loading: false,
    error: null,
};

// Async thunk for fetching tenders
export const fetchTenders = createAsyncThunk(
    'tenders/fetchTenders',
    async (queryParams?: string ) => {
        const response = await fetch(
            `https://white-camel-643529.hostingersite.com/api/tenders${queryParams}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch tenders');
        }
        return response.json();
    }
);

const tendersSlice = createSlice({
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

export default tendersSlice.reducer;
      