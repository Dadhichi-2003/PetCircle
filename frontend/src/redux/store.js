import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from "./user/authSlice"
import postSlice from "../redux/post/postSlice"
import socketSlice from './socket/socketSlice'
import chatSlice from './chat/chatSlice'
import rtnSlice from './chat/rtnSlice'
import communitySlice from './community/communitySlice'
import adoptionSlice from './adoption/adoptionSlice'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
 
  import { PersistGate } from 'redux-persist/integration/react'


  const rootReducer =combineReducers({
    auth:authSlice,
    post:postSlice,
    socketio:socketSlice,
    chat :chatSlice,
    realTimeNotification:rtnSlice,
    community:communitySlice,
    adoption:adoptionSlice
  })

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})


export default store