import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData.push(action.payload);
    },
  },
});

export const { addUserData } = userDataSlice.actions;

export const userData = (state) => state.userData.value;

export default userDataSlice.reducer;
