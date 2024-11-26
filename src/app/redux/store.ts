import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slice/registrationSlice';
import tendersReducer from './slice/tendersSlice';
import authReducer from './slice/authSlice'; // Import authReducer

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    tenders: tendersReducer,
    auth: authReducer, // Add auth reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
