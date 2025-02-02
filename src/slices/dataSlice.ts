import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  phoneNumber: "",
  senderName: "",
  contactAvatar: "",
  myAvatar: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    setIsLoggedIn: (state, payload) => {
      state.isLoggedIn = payload.payload;
    },
    setPhoneNumber: (state, payload) => {
      state.phoneNumber = payload.payload;
    },
    setSenderName: (state, payload) => {
      state.senderName = payload.payload;
    },
    setContactAvatar: (state, payload) => {
      state.contactAvatar = payload.payload;
    },
    setMyAvatar: (state, payload) => {
      state.myAvatar = payload.payload;
    },
    clearData: (state) => {
      (state.isLoggedIn = false),
        (state.phoneNumber = ""),
        (state.senderName = ""),
        (state.contactAvatar = ""),
        (state.myAvatar = "");
    },
  },
});

export const {
  setIsLoggedIn,
  setPhoneNumber,
  setSenderName,
  setContactAvatar,
  setMyAvatar,
  clearData,
} = dataSlice.actions;

export default dataSlice.reducer;
