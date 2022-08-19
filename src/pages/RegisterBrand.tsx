import React, { ChangeEvent, useState } from 'react';
import { Dialog, TextField } from '@material-ui/core';

import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../store/actions/alerts';
import CustomButton from '../components/CustomButton';
import buttonStyles from '../assets/styles/customButton.module.css';
import headingStyles from '../assets/styles/heading.module.css';

interface FormItems {
  [key: string]: string;
  email: string;
  orgName: string;
  name: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterBrand: React.FC<Props> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<FormItems>({
    email: '',
    orgName: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = { ...values };
    data[event.target.name] = event.target.value;
    setValues(data);
  };

  const handleClose = () => {
    setOpen((open) => !open);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${apiURI}/v1/organization/register`, { ...values }, { withCredentials: true });
      setLoading(false);
      setOpen((open) => !open);
      dispatch(showSuccessAlert('Organization created successfully!'));
    } catch (e) {
      console.log(e);
      dispatch(showErrorAlert('Something went wrong. Please try again!'));
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog fullWidth open={open}>
        <h2 className={headingStyles.headingXl}>Register New Brand</h2>
        <div className="flex flex-col px-6 py-2 overflow-y-auto">
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            name="orgName"
            label="Brand Name"
            type="text"
            fullWidth
            value={values.orgName}
          />
          <TextField
            onChange={handleChange}
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={values.email}
          />
          <TextField
            onChange={handleChange}
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={values.name}
          />
        </div>
        <div className="flex px-6 py-5 items-center justify-end gap-4">
          <CustomButton onClick={handleClose} className={buttonStyles.secondaryButton}>
            Cancel
          </CustomButton>
          <CustomButton onClick={handleSubmit} className={buttonStyles.buttonPrimary} loading={loading}>
            Create
          </CustomButton>
        </div>
      </Dialog>
    </div>
  );
};
