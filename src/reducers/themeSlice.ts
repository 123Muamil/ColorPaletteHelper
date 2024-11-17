import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ThemeData {
  id: string;
  themeName: string;
  themeDescription:string,
  textColor:string,
  descriptionColor:string,
  backgroundColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  linkColor: string;
  font: string;
}
interface ThemeState {
  data: ThemeData[];
}

const initialState: ThemeState = {
  data: [],
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    createTheme(state, action: PayloadAction<ThemeData>) {
      const {
        id,
        themeName,
        themeDescription,
        textColor,
        descriptionColor,
        backgroundColor,
        buttonBackgroundColor,
        buttonTextColor,
        linkColor,
        font,
      } = action.payload;
      state.data.push({
        id,
        themeName,
        themeDescription,
        textColor,
        descriptionColor,
        backgroundColor,
        buttonBackgroundColor,
        buttonTextColor,
        linkColor,
        font,
      });
    },
  },
});

export const { createTheme } = themeSlice.actions;
export default themeSlice.reducer;
