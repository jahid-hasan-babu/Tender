import {  configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slice/registrationSlice';
import tendersReducer from './slice/tendersSlice';
import newApplicationReducer from './slice/newApplicationSlice';
import authReducer from './slice/authSlice'; // Import authReducer
import allMembersSlice from './slice/allMembresSlice';
import companyReducer from './slice/companySlice';
import { userReducer } from './slice/userSlice';



export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    tenders: tendersReducer,
    auth: authReducer, // Add auth reducer
    newApplication: newApplicationReducer,
    allMembers: allMembersSlice,
    company: companyReducer,
    user: userReducer,
    tender: tendersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
