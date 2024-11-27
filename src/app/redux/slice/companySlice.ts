import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Type for the company data
interface CompanyData {
  id: string;
  company_name: string;
  identification_number:  string;
  email: string;
  sector_of_activity: string;
  phone: string;
  phone2?: string;
  address: string;
  country: string;
  town: string;
  province: string;
}

// Type for the state
interface CompanyState {
  companyData: CompanyData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CompanyState = {
  companyData: null,
  loading: false,
  error: null,
};

// Async thunk to fetch company data from the API
export const fetchCompanyData = createAsyncThunk<CompanyData, string, { rejectValue: string }>(
  'company/fetchCompanyData',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      return rejectWithValue("Authentication token not found");
    }

    try {
      const response = await fetch(
        `https://white-camel-643529.hostingersite.com/api/companies/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch company data");
      }

      return await response.json(); // Return company data
    } catch (error: any) {
      return rejectWithValue(error.message); // Return error message if API call fails
    }
  }
);

// Creating the slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyData.fulfilled, (state, action: PayloadAction<CompanyData>) => {
        state.companyData = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompanyData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || "An error occurred";
        state.loading = false;
      });
  },
});

// Export the reducer to be used in the store
export default companySlice.reducer;
