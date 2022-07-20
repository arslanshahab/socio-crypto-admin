import React, { ChangeEvent, useState } from 'react';
import { Dialog, DialogContent, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import CustomButton from './CustomButton';
import buttonStyles from '../assets/styles/customButton.module.css';
import headingStyles from '../assets/styles/heading.module.css';
import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../store/actions/alerts';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormItems {
  [key: string]: string;
  email: string;
  name: string;
  role: string;
}

export const RegisterUser: React.FC<Props> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<FormItems>({
    email: '',
    name: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<any>) => {
    const data = { ...values };
    data[event.target.name] = event.target.value;
    setValues(data);
  };

  const handleClose = () => {
    setOpen((open) => !open);
  };

  const handleSubmit = async () => {
    debugger;
    try {
      setLoading(true);
      axios.post(
        `${apiURI}/v1/organization/new-user`,
        { name: values.name, email: values.email, role: values.role },
        { withCredentials: true },
      );
      setLoading(false);
      dispatch(showSuccessAlert('User created successfully!'));
      setOpen((open) => !open);
    } catch (e) {
      console.log(e);
      dispatch(showErrorAlert('Something went wrong. Please try again!'));
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
            name="role"
            onChange={handleChange}
            labelPlacement={'top'}
            className="text-blue-800 p-0"
          />
          <FormControlLabel
            labelPlacement={'top'}
            control={<Radio color={'primary'} style={{ padding: '0px' }} />}
            label={'Manager'}
            value={'manager'}
            name="role"
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
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSubmit} loading={loading}>
          Create
        </CustomButton>
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleClose}>
          Cancel
        </CustomButton>
      </div>
    </Dialog>
  );
};
