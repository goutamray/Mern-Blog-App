import { createSlice } from "@reduxjs/toolkit";


// initial state
const initialState = {
  currentUser : null,
  error : null,
  loading : false,
}


// create slice
const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    signInStart : (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess : (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure : (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart : (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess : (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure : (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart : (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess : (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure : (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

// export actions 
export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;


// export default reducer 
export default userSlice.reducer;
