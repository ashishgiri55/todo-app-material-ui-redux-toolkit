import { createAsyncThunk } from '@reduxjs/toolkit';
import { noteActions } from './index';

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, thankAPI) => {
    const res = await fetch('http://localhost:8000/notes');
    const notes = await res.json();
    return notes;
  }
);

export const createNote = createAsyncThunk(
  'notes/create',
  async (notesDetail, { dispatch, rejectWithValue }) => {
    const { title, details, category } = notesDetail;

    if (title === '') {
      dispatch(noteActions.updateField({ key: 'titleError', value: true }));
    }
    if (details === '') {
      dispatch(noteActions.updateField({ key: 'detailsError', value: true }));
    }
    if (!title || !details) {
      return rejectWithValue({
        fieldError: {
          title: title || '',
          details: details || '',
        },
      });
    }

    const res = await fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ title, details, category }),
    });

    if (res.ok) {
      return res.json();
    }
  }
);
export const updateNote = createAsyncThunk(
  'notes/updated',
  async ({ id, note }) => {
    const res = await fetch('http://localhost:8000/notes/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    return 'success';
  }
);
export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, { rejectWithValue }) => {
    const res = await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
    });

    if (res.ok) {
      return id;
    } else {
      return rejectWithValue(res.message);
    }
  }
);
