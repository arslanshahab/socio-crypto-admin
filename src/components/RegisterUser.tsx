import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../operations/queries/admin';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import CustomButton from './CustomButton';
import buttonStyles from '../assets/styles/customButton.module.css';
import headingStyles from '../assets/styles/heading.module.css';

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

  const [newUser, { loading, error }] = useMutation(NEW_USER, {
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
    try {
      await newUser();
      if (error) throw new Error(`user registration error: ${error}`);
      setOpen((open) => !open);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={open}>
      <h2 className={`${headingStyles.headingXl} pb-0`}>Register New User</h2>
      <DialogContent style={{ width: '500px' }}>
        <RadioGroup style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <FormControlLabel
            control={<Radio color={'primary'} style={{ padding: '0px' }} />}
            label={'Admin'}
            value={'admin'}
            onChange={handleChange}
            labelPlacement={'top'}
            className="text-blue-800 p-0"
          />
          <FormControlLabel
            labelPlacement={'top'}
            control={<Radio color={'primary'} style={{ padding: '0px' }} />}
            label={'Manager'}
            value={'manager'}
            onChange={handleChange}
            className="text-blue-800"
          />
        </RadioGroup>
        <div className="mb-4">
          <TextField autoFocus onChange={handleChange} name="name" label="Name" type="text" fullWidth />
          <TextField autoFocus onChange={handleChange} name="email" label="Email Address" type="email" fullWidth />
        </div>
      </DialogContent>
      <div className={`${buttonStyles.buttonWrapper} mb-4`}>
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSubmit}>
          {loading ? <CircularProgress color="inherit" size={20} /> : 'Create'}
        </CustomButton>
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleClose}>
          Cancel
        </CustomButton>
      </div>
    </Dialog>
  );
};
