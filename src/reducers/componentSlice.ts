// src/store/componentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ComponentType = 'AddTheme' | 'ViewTheme' ;

interface ComponentState {
  currentComponent: ComponentType;
}

const initialState: ComponentState = {
  currentComponent: 'AddTheme', // Default component
};

const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    setComponent: (state, action: PayloadAction<ComponentType>) => {
      state.currentComponent = action.payload;
    },
  },
});

export const { setComponent } = componentSlice.actions;
export default componentSlice.reducer;
