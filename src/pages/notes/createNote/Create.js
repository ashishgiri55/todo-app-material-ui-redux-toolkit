import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory, useParams } from 'react-router-dom';
import { createNoteSelector, getNoteById } from '../store/selector';
import { useSelector, useDispatch } from 'react-redux';
import { noteActions } from '../store';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function Create() {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const note = useSelector(getNoteById(+params.id));

  const { title, details, titleError, detailsError, category } = useSelector(
    createNoteSelector
  );

  useEffect(() => {
    console.log(note, params);
    if (params.id) {
      dispatch(noteActions.fillUpdateNoteData({ ...note }));
    }
  }, [params, note, dispatch]);

  // const [title, setTitle] = useState('')
  // const [details, setDetails] = useState('')
  // const [titleError, setTitleError] = useState(false)
  // const [detailsError, setDetailsError] = useState(false)
  // const [category, setCategory] = useState('money')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      details,
      category,
    };

    if (params.id) {
      const promise = await dispatch(
        noteActions.updateNote({ id: params.id, note: newNote })
      );
      if (noteActions.updateNote.fulfilled.match(promise)) {
        console.log('updated', newNote);
        history.push('/');
        return;
      }
    }
    const promise = await dispatch(noteActions.createNote(newNote));

    if (noteActions.createNote.fulfilled.match(promise)) {
      history.push('/');
    }
    // setTitleError(false);
    // setDetailsError(false);
    // if (title == '') {
    //   setTitleError(true);
    // }
    // if (details == '') {
    //   setDetailsError(true);
    // }
    // if (title && details) {
    //   fetch('http://localhost:8000/notes', {
    //     method: 'POST',
    //     headers: { 'Content-type': 'application/json' },
    //     body: JSON.stringify({ title, details, category }),
    //   }).then(() => history.push('/'));
    // }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) =>
            dispatch(
              noteActions.updateField({ key: 'title', value: e.target.value })
            )
          }
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          value={title}
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) =>
            dispatch(
              noteActions.updateField({ key: 'details', value: e.target.value })
            )
          }
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          value={details}
          error={detailsError}
        />

        {/* <Radio value="hello" />
        <Radio value="goodbye" /> */}

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) =>
              dispatch(
                noteActions.updateField({
                  key: 'category',
                  value: e.target.value,
                })
              )
            }
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
