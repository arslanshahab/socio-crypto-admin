import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../operations/queries/admin';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormItems {
  email: string;
  name: string;
  role: string;
}

export const RegisterUser: React.FC<Props> = ({ open, setOpen }) => {
  const [values, setValues] = useState({
    email: '',
    name: '',
    role: '',
  } as FormItems);
  const [role, setRole] = useState('');
  const [newUser, { error }] = useMutation(NEW_USER, {
    variables: { name: values.name, email: values.email, role },
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
      await newUser();
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
          <Grid container direction={'column'} justify={'center'}>
            <Grid container item direction={'row'}>
              <Grid item>
                <FormControl>
                  <FormLabel>User Role</FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio color={'primary'} />}
                      label={'Admin'}
                      value={'admin'}
                      onChange={handleChange}
                      labelPlacement={'top'}
                    />
                    <FormControlLabel
                      labelPlacement={'top'}
                      control={<Radio color={'primary'} />}
                      label={'Manager'}
                      value={'manager'}
                      onChange={handleChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                autoFocus
                onChange={handleChange}
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
              />
            </Grid>
          </Grid>
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
