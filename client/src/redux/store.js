
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import useReducer  from './user/userSlice';
import themeReducer  from './theme/themeSlice';
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

// create root reducer
const rootReducer = combineReducers({
  user : useReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version : 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// create store 
export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})


// export persistor 
export const persistor = persistStore(store);


