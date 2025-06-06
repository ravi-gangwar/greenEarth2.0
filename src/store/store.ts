import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './features/userReducer'
import timerReducer from './features/timerReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user', 'timer'],
}

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  timer: timerReducer,
})

const persistedCartReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedCartReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/FLUSH', 'persist/REGISTER', 'persist/PURGE'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
