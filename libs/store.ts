/// <reference types="redux-persist" />

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sessionStorage from 'redux-persist/lib/storage/session';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

import authReducer from './features/auth/authSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const persistor = persistStore(makeStore());
