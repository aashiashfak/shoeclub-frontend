import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isActive: false,
  email: null,
  username: null,
  accessToken: null,
  role: null,
  phoneNumber: null,
  dateOfBirth: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser reducere called");

      state.isAuthenticated = true;
      state.isActive = action.payload.isActive;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber || null;
      state.username = action.payload.username || null;
      state.dateOfBirth = action.payload.dateOfBirth || null;
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
    },
    setAccessToken: (state, action) => {
      console.log("setRefreshToken reducere called");

      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      console.log("new tokens saved to store");
    },
    logout: (state) => {
      console.log("inside logout reducer");
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isActive = false;
      state.email = null;
      state.phoneNumber = null;
      state.username = null;
      state.dateOfBirth = null;
      state.role = null;
    },
  },
});

export const {setUser, setAccessToken, logout} = userAuthSlice.actions;

export default userAuthSlice.reducer;
