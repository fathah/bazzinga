// src/store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// persist config - choose which reducers to persist with whitelist/blacklist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  // version: 1, migrate: createMigrate(...), // optional migration
};

const rootReducer = combineReducers({
  user: userReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux-persist action types for serializable middleware
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);