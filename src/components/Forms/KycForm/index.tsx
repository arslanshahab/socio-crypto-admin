import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import styles from './kycForm.module.css';
import CustomButton from '../../CustomButton';
import headingStyles from '../../../assets/styles/heading.module.css';
import buttonStyles from '../../../assets/styles/customButton.module.css';
import { AdminProfileTypes, FileObject, VerifyKycTypes } from '../../../types';
import FileUpload from '../../FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../../store/actions/alerts';
import countryList from 'react-select-country-list';
import { ApiClient } from '../../../services/apiClient';
import { getProfile } from '../../../store/actions/profile';

interface IKycFormProps {
  callback: () => void;
}

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
  documentType: '',
  documentCountry: '',
  frontDocumentImage: '',
  faceImage: '',
  backDocumentImage: '',
};

const KycForm: FC<IKycFormProps> = ({ callback }: IKycFormProps) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: { profile: AdminProfileTypes }) => state);
  const options = useMemo(() => countryList().getData(), []);
  const [kyc, setKyc] = useState<VerifyKycTypes>(intialObject);
  const [loading, setLoading] = useState<boolean>(false);
  const [frontDocumentImage, setFrontDocumentImage] = useState<FileObject>({
    filename: '',
    format: '',
    file: '',
  });
  const [faceImage, setFaceImage] = useState<FileObject>({
    filename: '',
    file: '',
    format: '',
  });
  const [backDocumentImage, setBackDocumentImage] = useState<FileObject>({
    filename: '',
    file: '',
    format: '',
  });

  // Handle OnChange
  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const data = { ...kyc };
    data[e.target.name] = e.target.value;
    setKyc(data);
  };

  // On front image success
  const onFrontImageSuccess = (data: FileObject) => {
    setKyc({ ...kyc, frontDocumentImage: data.file });
    setFrontDocumentImage(data);
  };
  // On face image success
  const onFaceImageSuccess = (data: FileObject) => {
    setKyc({ ...kyc, faceImage: data.file });
    setFaceImage(data);
  };
  // On back image success
  const onBackImageSuccess = (data: FileObject) => {
    setKyc({ ...kyc, backDocumentImage: data.file });
    setBackDocumentImage(data);
  };

  // On Error
  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  // Handle Submit
  const handleSubmit = async () => {
    setLoading(true);
    const updatedKyc = { ...kyc };
    const dob = updatedKyc.dob.replace(/-/g, '/');
    ApiClient.registerKyc({ ...kyc, dob })
      .then((res) => {
        dispatch(showSuccessAlert(`You KYC has been ${res.status}`));
        dispatch(getProfile({ ...profile, verifyStatus: res.status }));
      })
      .catch((err) => dispatch(showErrorAlert(err.message)))
      .finally(() => {
        setLoading(false);
        callback();
      });
  };

  return (
    <div className="p-6">
      <h2 className={headingStyles.headingSm}>Add Kyc Information</h2>
      <div className={`${styles.formWrapper}`}>
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
        <div className={`${styles.inputWrapper}`}>
          <select
            name="billingCountry"
            value={kyc.billingCountry}
            className={`${styles.input}`}
            onChange={handleOnChange}
            placeholder="Document Country *"
          >
            <option value="" disabled>
              Select Billing Country *
            </option>
            {options.map((x: { value: string; label: string }) => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
        <div className={`${styles.inputWrapper}`}>
          <input
            type="number"
            name="zipCode"
            value={kyc.zipCode}
            className={`${styles.input}`}
            placeholder="Zip Code *"
            onChange={handleOnChange}
          />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <select id="gender" name="gender" value={kyc.gender} className={`${styles.input}`} onChange={handleOnChange}>
            <option value="" disabled>
              Select Gender *
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
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
      <div className="grid grid-cols-2 gap-4">
        <div className={`${styles.inputWrapper}`}>
          <select name="documentType" value={kyc.documentType} className={`${styles.input}`} onChange={handleOnChange}>
            <option value="" disabled>
              Select Document Type *
            </option>
            <option value="PP">Passport</option>
            <option value="ID">National ID</option>
            <option value="DL">Driver&lsquo;s License</option>
          </select>
        </div>
        <div className={`${styles.inputWrapper}`}>
          <select
            name="documentCountry"
            value={kyc.documentCountry}
            className={`${styles.input}`}
            onChange={handleOnChange}
            placeholder="Document Country *"
          >
            <option value="" disabled>
              Select Document Country *
            </option>
            {options.map((x: { value: string; label: string }) => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 my-6">
        <FileUpload
          value={faceImage}
          label="Add Face Image"
          mediaType="documentImage"
          tooltip="Only Image files (JPG, JPEG, PNG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
          onFileSuccess={onFaceImageSuccess}
          onFileError={onError}
        />
        <FileUpload
          value={frontDocumentImage}
          label="Add Front Document Image"
          mediaType="documentImage"
          tooltip="Only Image files (JPG, JPEG, PNG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
          onFileSuccess={onFrontImageSuccess}
          onFileError={onError}
        />
        <FileUpload
          value={backDocumentImage}
          label="Add Back Document Image"
          mediaType="documentImage"
          tooltip="Only Image files (JPG, JPEG, PNG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
          onFileSuccess={onBackImageSuccess}
          onFileError={onError}
        />
      </div>
      <div className={buttonStyles.buttonWrapper}>
        <CustomButton className={buttonStyles.secondaryButton} onClick={() => callback()}>
          Close
        </CustomButton>
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSubmit} loading={loading}>
          Submit
        </CustomButton>
      </div>
    </div>
  );
};

export default KycForm;
