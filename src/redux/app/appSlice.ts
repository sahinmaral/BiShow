import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import AppStateType from "../../types/AppStateType";
import ActivityFilter from "../../types/ActivityFilter";
import Activity from "../../types/Activity";
import { RootState } from "../store";
import ModalContent from "../../types/ModalContentType";

const initialState: AppStateType = {
  activities: [],
  activityFilter: {},
  modalContent: {
    title: "",
    isOpened: false,
    datas: [],
    modalType: null,
  },
  fetchResultAtPage: {
    isLoading: false,
    errorMessage: "",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActivityFilter: (
      state: AppStateType,
      action: PayloadAction<ActivityFilter>
    ) => {
      state.activityFilter = action.payload;
    },
    setActivities: (state: AppStateType, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload;
    },
    setModalContent: (
      state: AppStateType,
      action: PayloadAction<ModalContent>
    ) => {
      state.modalContent = action.payload;
    },
    setModalVisibilityToggle: (state: AppStateType) => {
      const modalContent = state.modalContent as ModalContent;
      modalContent.isOpened = !modalContent.isOpened;
    },
    setIsLoadingOfFetchResult: (
      state: AppStateType,
      action: PayloadAction<boolean>
    ) => {
      state.fetchResultAtPage.isLoading = action.payload;
    },
    setErrorMessageOfFetchResult: (
      state: AppStateType,
      action: PayloadAction<string>
    ) => {
      state.fetchResultAtPage.errorMessage = action.payload;
    },
  },
});

export const {
  setActivityFilter,
  setActivities,
  setModalContent,
  setModalVisibilityToggle,
  setIsLoadingOfFetchResult,
  setErrorMessageOfFetchResult,
} = appSlice.actions;

export const getAppState = (state: RootState) => state.app;

export default appSlice.reducer;
