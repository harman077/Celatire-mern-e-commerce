import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Utility function to get user from localStorage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("userInfo");
  return user ? JSON.parse(user) : null;
};

// Retrieve user info and token from localStorage if available
const userFromStorage = getUserFromLocalStorage();

// Check for an existing guest Id in localStorage or generate a new one
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
    localStorage.setItem("userInfo", JSON.stringify(response.data.user));
    localStorage.setItem("userToken", response.data.token);
    return response.data.user;
  } catch (error) {
    console.log(error.response);
    
    return rejectWithValue(error.response?.data || "Login failed");
    
  }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
    localStorage.setItem("userInfo", JSON.stringify(response.data.user));
    localStorage.setItem("userToken", response.data.token);
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Registration failed");
  }
});

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      // Reset guest ID upon logout
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId); // Set a new guest ID in localStorage
    },

    // Generate a new guest ID
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred during login.";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred during registration.";
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
