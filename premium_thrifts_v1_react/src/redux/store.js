import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from '../reducers/index';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['some/non-serializable-action'],
          ignoredPaths: ['some.nonSerializable.field']
        }
      }),
      devTools: process.env.NODE_ENV !== 'production',
});
