import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { setMessage } from '../../helpers/setMessage';
import Message from './Message';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [severity, setSeverity] = useState('success');
  const [openMsg, setOpenMsg] = useState(false);

  const handleSend = async (e) => {
    try {
      setLoading(true);
      if (
        fName === '' ||
        lName === '' ||
        text === '' ||
        !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          email
        )
      ) {
        setMsg('One or more fields are incorrect!');
        setSeverity('error');
        setOpenMsg(true);
        setLoading(false);

        return;
      }
      const result = await setMessage(email, fName, lName, text);
      setMsg('Please await our reply!');
      setSeverity('success');
      setOpenMsg(true);
      setLoading(false);
    } catch (e) {
      setMsg('Message not sent please try again later!');
      setSeverity('error');
      setOpenMsg(true);
      setLoading(false);
    }
  };

  return (
    <Grid container direction="column" spacing={4} sx={{ padding: '1rem' }}>
      <Grid item>
        <Message
          text={msg}
          severity={severity}
          open={openMsg}
          setOpen={setOpenMsg}
        />
      </Grid>
      <Grid item>
        <Typography variant="body2">Contact us:</Typography>
      </Grid>
      <Grid item>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          placeholder="Email"
          required
          fullWidth
          variant="filled"
        />
      </Grid>

      <Grid item container justifyContent="space-between" spacing={4}>
        <Grid item xs={12} md={5}>
          <TextField
            onChange={(e) => setFName(e.target.value)}
            size="small"
            placeholder="First Name"
            required
            fullWidth
            variant="filled"
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField
            onChange={(e) => setLName(e.target.value)}
            size="small"
            placeholder="Last Name"
            required
            fullWidth
            variant="filled"
          />
        </Grid>
      </Grid>

      <Grid item>
        <TextField
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={5}
          fullWidth
          variant="filled"
          placeholder="Message"
        />
      </Grid>

      <Grid item container justifyContent="center">
        <Grid item>
          <Button disabled={loading} variant="outlined" onClick={handleSend}>
            {loading ? <CircularProgress size={20} /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
