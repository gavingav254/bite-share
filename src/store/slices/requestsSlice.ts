// src/store/slices/requestsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Request } from '../../types';

interface RequestsState {
  requests: Request[];
  isLoading: boolean;
}

const initialState: RequestsState = {
  requests: [],
  isLoading: false,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<Request[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<Request>) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action: PayloadAction<Request>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setRequests, addRequest, updateRequest, setLoading } = requestsSlice.actions;
export default requestsSlice.reducer;