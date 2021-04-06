import { createSlice } from '@reduxjs/toolkit';
import { fetchNotes, createNote, deleteNote, updateNote } from './thunk';

const initialState = {
  notes: [],
  createNote: {
    title: '',
    details: '',
    titleError: false,
    detailsError: false,
    category: 'todos',
  },
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    updateField(state, { payload }) {
      const { key, value } = payload;
      state.createNote[key] = value;
    },

    fillUpdateNoteData(state, { payload }) {
      state.createNote.title = payload.title;
      state.createNote.details = payload.details;
      state.createNote.category = payload.category;
    },
  },

  extraReducers: {
    [fetchNotes.fulfilled]: (state, { payload }) => {
      state.notes = payload;
    },

    [createNote.pending]: (state) => {
      state.createNote.titleError = false;
      state.createNote.detailsError = false;
    },

    [createNote.rejected]: (state, { payload }) => {
      state.createNote.titleError = payload.fieldError?.title ? false : true;
      state.createNote.detailsError = payload.fieldError?.details
        ? false
        : true;
    },

    [createNote.fulfilled]: (state) => {
      // state.createNote = initialState.createNote;
      return initialState;
    },

    [updateNote.fullfilled]: (state, action) => {
      state.notes = state.notes.map((updatedNote) => {
        if (updatedNote.id === action.payload.id) {
          updatedNote = action.payload.value;
        }
        return updatedNote;
      });
    },

    [deleteNote.fulfilled]: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const noteActions = {
  ...noteSlice.actions,
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
};
export default noteSlice.reducer;
