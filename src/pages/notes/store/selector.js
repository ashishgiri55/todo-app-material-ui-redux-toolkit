export const noteSelector = (state) => state.page.notes.notes;

export const createNoteSelector = (state) => state.page.notes.createNote;
export const updateNoteSelector = (state) => state.page.notes.updateNote;

export const getNoteById = (id) => (state) =>
  state.page.notes.notes.find((note) => note.id === id);
