import { combineReducers } from '@reduxjs/toolkit';
import noteReducer from '../pages/notes/store';

export const rootReducer = combineReducers({
  page: combineReducers({
    notes: noteReducer,
  }),
});
