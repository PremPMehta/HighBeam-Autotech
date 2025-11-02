import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLoginUser, postRegisterUser } from "../../services/client";

// Define the api calls
const signupUser = async (userData) => {
  const response = await postRegisterUser(userData);
  console.log("response", response);
  return response; // { token: string; user: { username: string } }
};
const loginUser = async (userData) => {
  const response = await postLoginUser(userData);
  console.log("response", response);
  return response; // { token: string; user: { username: string } }
};

//define initial State
const initialState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

//create middleware
export const signup = createAsyncThunk(
  "/user/sinup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error) {
      const errorMessage = error.message || "Signup failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "/user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      const errorMessage = error.message || "Signup failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    initializeState: (state) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) {
        state.token = token;
        state.user = user ? JSON.parse(user) : null;
      }
    },
    reset: () => initialState,
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.response.token;
        state.user = action.payload.response.user;
        state.status = "success";
        state.error = null;
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.response.user)
        );
        localStorage.setItem("token", action.payload.response.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "login failed";
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "success";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Signup failed";
      });
  },
});

export const { initializeState, reset, logout } = authSlice.actions;
export default authSlice.reducer;
