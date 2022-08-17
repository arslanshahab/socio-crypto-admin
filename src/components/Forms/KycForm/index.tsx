import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import styles from './kycForm.module.css';
import CustomButton from '../../CustomButton';
import headingStyles from '../../../assets/styles/heading.module.css';
import buttonStyles from '../../../assets/styles/customButton.module.css';
import { useDispatch } from 'react-redux';
import { KycInformationTypes } from '../../../types';

const intialObject = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  billingStreetAddress: '',
  billingCity: '',
  billingCountry: '',
  zipCode: '',
  gender: '',
  dob: '',
  phoneNumber: '',
  ip: '',
};

const KycForm: FC = () => {
  const dispatch = useDispatch();
  const [kyc, setKyc] = useState<KycInformationTypes>(intialObject);

  // Handle OnChange
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...kyc };
    data[e.target.name] = e.target.value;
    setKyc(data);
  };

  // Handle Gender
  const handleSelect = (e: any) => {
    // debugger;
    const data = { ...kyc };
    data[e.target.name] = e.target.value;
    setKyc(data);
  };

  // Handle OnSubmit
  const handleOnSubmit = () => {
    console.log(kyc);
  };

  return (
    <div className="p-6">
      <h2 className={headingStyles.headingSm}>Add Kyc Information</h2>
      <TextField
        name="firstName"
        fullWidth
        value={kyc.firstName}
        onChange={handleOnChange}
        label="First Name"
        variant="standard"
        required
      />
      <TextField
        name="middleName"
        fullWidth
        value={kyc.middleName}
        onChange={handleOnChange}
        label="Middle Name"
        variant="standard"
      />
      <TextField
        name="lastName"
        fullWidth
        value={kyc.lastName}
        onChange={handleOnChange}
        label="Last Name"
        variant="standard"
      />
      <TextField name="email" fullWidth value={kyc.email} onChange={handleOnChange} label="Email" variant="standard" />
      <TextField
        name="billingStreetAddress"
        fullWidth
        value={kyc.billingStreetAddress}
        onChange={handleOnChange}
        label="Billing Street Address"
        variant="standard"
      />
      <TextField
        name="billingCity"
        fullWidth
        value={kyc.billingCity}
        onChange={handleOnChange}
        label="Billing City"
        variant="standard"
      />
      <TextField
        name="billingCountry"
        fullWidth
        value={kyc.billingCountry}
        onChange={handleOnChange}
        label="Billing Country"
        variant="standard"
      />
      <TextField
        name="zipCode"
        fullWidth
        value={kyc.zipCode}
        onChange={handleOnChange}
        label="Zip Code"
        variant="standard"
      />
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <FormControl fullWidth>
        <Select label="Age" onChange={handleSelect} variant="standard" name="gender" value={kyc.gender}>
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
      </FormControl>
      <input type="date" value={kyc.dob} name="dob" onChange={handleOnChange} />
      <TextField
        name="phoneNumber"
        fullWidth
        value={kyc.phoneNumber}
        onChange={handleOnChange}
        label="Phone Number"
        variant="standard"
      />
      <TextField name="ip" fullWidth value={kyc.ip} onChange={handleOnChange} label="IP Address" variant="standard" />
      <div className="flex justify-center pt-4">
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleOnSubmit}>
          Submit
        </CustomButton>
      </div>
    </div>
  );
};

export default KycForm;
