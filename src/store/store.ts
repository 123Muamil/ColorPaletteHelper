import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "./storage";
import ThemeReducer from "@/reducers/themeSlice";
import ComponentReducer from "@/reducers/componentSlice";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["tracking"],
};
const persistedThemeReducer = persistReducer(persistConfig, ThemeReducer)
export const makeStore = () => {
  return configureStore({
    reducer:{
      theme:persistedThemeReducer,
      component:ComponentReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];