import React, { FC, useMemo, useState } from 'react';
import styles from './kycForm.module.css';
import CustomButton from '../../CustomButton';
import headingStyles from '../../../assets/styles/heading.module.css';
import buttonStyles from '../../../assets/styles/customButton.module.css';
import { ProfileTypes, FileObject } from '../../../types';
import FileUpload from '../../FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../../store/actions/alerts';
import countryList from 'react-select-country-list';
import { ApiClient } from '../../../services/apiClient';
import { getProfile } from '../../../store/actions/profile';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IKycFormProps {
  callback: () => void;
}
type IFormInput = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  billingStreetAddress: string;
  billingCity: string;
  billingCountry: string;
  zipCode: string;
  gender: string;
  dob: string;
  phoneNumber: string;
  documentType: string;
  documentCountry: string;
  frontDocumentImage: string;
  faceImage: string;
  backDocumentImage: string;
};

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: intialObject });
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const options = useMemo(() => countryList().getData(), []);
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

  // On front image success
  const onFrontImageSuccess = (data: FileObject) => {
    setFrontDocumentImage(data);
  };
  // On face image success
  const onFaceImageSuccess = (data: FileObject) => {
    setFaceImage(data);
  };
  // On back image success
  const onBackImageSuccess = (data: FileObject) => {
    setBackDocumentImage(data);
  };

  // On Error
  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  // Handle Submit
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!faceImage.file || !frontDocumentImage.file || !backDocumentImage.file)
      return dispatch(showErrorAlert('Please upload kyc documents'));
    setLoading(true);
    const updatedKyc = { ...data };
    const dob = updatedKyc.dob.replace(/-/g, '/');
    ApiClient.registerKyc({
      ...data,
      dob,
      frontDocumentImage: frontDocumentImage.file,
      faceImage: faceImage.file,
      backDocumentImage: backDocumentImage.file,
    })
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
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className={`${styles.input}`}
              placeholder="First Name *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.firstName?.message}</p>
        </div>
        <div className={`${styles.inputWrapper}`}>
          <input type="text" {...register('middleName')} className={`${styles.input}`} placeholder="Middle Name" />
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className={`${styles.input}`}
              placeholder="Last Name *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.lastName?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`${styles.input}`}
              placeholder="Email *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.email?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              {...register('billingStreetAddress', { required: 'Billing street address is required' })}
              className={`${styles.input}`}
              placeholder="Billing Street Address *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.billingStreetAddress?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              {...register('billingCity', { required: 'Billing city is required' })}
              className={`${styles.input}`}
              placeholder="Billing City *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.billingCity?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <select
              {...register('billingCountry', { required: 'Billing country is required' })}
              className={`${styles.input}`}
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
          <p className={styles.errorMessage}>{errors.billingCountry?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="number"
              {...register('zipCode', { required: 'Zip code is required' })}
              className={`${styles.input}`}
              placeholder="Zip Code *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.zipCode?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <select {...register('gender', { required: 'Please select gender' })} className={`${styles.input}`}>
              <option value="" disabled>
                Select Gender *
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <p className={styles.errorMessage}>{errors.gender?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              onFocus={(e) => (e.target.type = 'date')}
              {...register('dob', { required: 'Date of birth is required' })}
              className={`${styles.input}`}
              placeholder="Date of Birth *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.dob?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              {...register('phoneNumber', { required: 'Phone number is required' })}
              className={`${styles.input}`}
              placeholder="Phone Number *"
            />
          </div>
          <p className={styles.errorMessage}>{errors.phoneNumber?.message}</p>
        </div>
        <div>
          <div className={`${styles.inputWrapper}`}>
            <select
              {...register('documentType', { required: 'Please select document type' })}
              className={`${styles.input}`}
            >
              <option value="" disabled>
                Select Document Type *
              </option>
              <option value="PP">Passport</option>
              <option value="ID">National ID</option>
              <option value="DL">Driver&lsquo;s License</option>
            </select>
          </div>
          <p className={styles.errorMessage}>{errors.documentType?.message}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className={`${styles.inputWrapper}`}>
            <select
              {...register('documentCountry', { required: 'Document country is required' })}
              className={`${styles.input}`}
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
          <p className={styles.errorMessage}>{errors.documentCountry?.message}</p>
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

        <CustomButton className={buttonStyles.buttonPrimary} loading={loading} onClick={handleSubmit(onSubmit)}>
          Submit
        </CustomButton>
      </div>
    </div>
  );
};

export default KycForm;
