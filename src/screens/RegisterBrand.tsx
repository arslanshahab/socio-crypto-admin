import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { NEW_ORG } from '../operations/queries/admin';

interface FormItems {
  email: string;
  orgName: string;
  name: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterBrand: React.FC<Props> = ({ open, setOpen }) => {
  const [values, setValues] = useState({
    email: '',
    orgName: '',
    name: '',
  } as FormItems);
  const [newOrg, { error }] = useMutation(NEW_ORG, {
    variables: { orgName: values.orgName, email: values.email, name: values.name },
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
      await newOrg();
      if (error) throw new Error('Registration Error');
      setOpen((open) => !open);
    } catch (e) {
      console.log(e, error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog open={open}>
        <DialogTitle>Register New Brand</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            name="orgName"
            label="Brand Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField autoFocus onChange={handleChange} margin="dense" name="name" label="Name" type="text" fullWidth />
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
