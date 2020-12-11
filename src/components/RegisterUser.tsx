import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../operations/queries/admin';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormItems {
  email: string;
  name: string;
}

export const RegisterUser: React.FC<Props> = ({ open, setOpen }) => {
  const [values, setValues] = useState({
    email: '',
    name: '',
  } as FormItems);
  const [newUser, { error }] = useMutation(NEW_USER, {
    variables: { name: values.name, email: values.email },
  });

  const handleChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClose = () => {
    setOpen((open) => !open);
  };

  const handleSubmit = async (event: any) => {
    event?.preventDefault();
    try {
      const response = await newUser();
      if (error) throw new Error(`user registration error: ${error}`);
      setOpen((open) => !open);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog open={open}>
        <DialogTitle>Register New User</DialogTitle>
        <DialogContent>
          <TextField autoFocus onChange={handleChange} margin="dense" name="name" label="Name" type="text" fullWidth />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
