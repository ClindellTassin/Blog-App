import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

// redirect action
const resetAccount = createAction("account/verify-reset");

// create verification token
export const verificationTokenAction = createAsyncThunk(
  "account/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/generate-verifiy-email-token`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// verify account
export const verifyAccountAction = createAsyncThunk(
  "account/verify",
  async (token, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/verify-account`,
        { token },
        config
      );
      dispatch(resetAccount());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// slices
const verificationSlices = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    // verification token
    builder.addCase(verificationTokenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetAccount, (state, action) => {
      state.isVerified = true;
    });
    builder.addCase(verificationTokenAction.fulfilled, (state, action) => {
      state.token = action?.payload;
      state.isVerified = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verificationTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // verify account
    builder.addCase(verifyAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
      state.verified = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verifyAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default verificationSlices.reducer;
