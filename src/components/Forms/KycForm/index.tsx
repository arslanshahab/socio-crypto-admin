import React, { ChangeEvent, FC, useState } from 'react';
import styles from './kycForm.module.css';
import CustomButton from '../../CustomButton';
import headingStyles from '../../../assets/styles/heading.module.css';
import buttonStyles from '../../../assets/styles/customButton.module.css';
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
  const [kyc, setKyc] = useState<KycInformationTypes>(intialObject);

  // Handle OnChange
  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const data = { ...kyc };
    data[e.target.name] = e.target.value;
    setKyc(data);
  };

  return (
    <div className="p-6">
      <h2 className={headingStyles.headingSm}>Add Kyc Information</h2>
      <div className={`${styles.formWrapper}`}>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="firstName"
              value={kyc.firstName}
              className={`${styles.input}`}
              placeholder="First Name *"
              required={true}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="middleName"
              value={kyc.middleName}
              className={`${styles.input}`}
              placeholder="Middle Name"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="lastName"
              value={kyc.lastName}
              className={`${styles.input}`}
              placeholder="Last Name *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="email"
              value={kyc.email}
              className={`${styles.input}`}
              placeholder="Email *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="billingStreetAddress"
              value={kyc.billingStreetAddress}
              className={`${styles.input}`}
              placeholder="Billing Street Address *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="billingCity"
              value={kyc.billingCity}
              className={`${styles.input}`}
              placeholder="Billing City *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="billingCountry"
              value={kyc.billingCountry}
              className={`${styles.input}`}
              placeholder="Billing Country *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="zipCode"
              value={kyc.zipCode}
              className={`${styles.input}`}
              placeholder="Zip Code *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className={`${styles.inputWrapper}`}>
          <select
            id="gender"
            name="gender"
            value={kyc.gender}
            className={`${styles.input}`}
            // className="mt-1 border border-slate-600 w-full rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500  bg-transparent text-gray-500 sm:text-sm "
            onChange={handleOnChange}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              onFocus={(e) => (e.target.type = 'date')}
              name="dob"
              value={kyc.dob}
              className={`${styles.input}`}
              placeholder="Date of Birth *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="phoneNumber"
              value={kyc.phoneNumber}
              className={`${styles.input}`}
              placeholder="Phone Number *"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              name="ip"
              value={kyc.ip}
              className={`${styles.input}`}
              placeholder="IP Address"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <CustomButton className={buttonStyles.buttonPrimary}>Submit</CustomButton>
      </div>
    </div>
  );
};

export default KycForm;
