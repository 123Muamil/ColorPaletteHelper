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
  link:string;
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
        link
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
        link
      });
    },
    deleteById(state, action: PayloadAction<string>) {
      const id = action.payload; // Get the ID from the action payload
      console.log("the payload is:",action.payload)
      const filterData = state.data.filter((item) => item.id !== id);
      state.data = filterData;
    },
  },
});

export const { createTheme,deleteById } = themeSlice.actions;
export default themeSlice.reducer;
