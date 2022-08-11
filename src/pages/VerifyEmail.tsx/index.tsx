import React from 'react';
import VerifyEmailForm from '../../components/Forms/VerifyEmailForm/VerifyEmailForm';
import PublicLayout from '../../layouts/PublicLayout';

const VerifyEmail: React.FC = () => {
  return (
    <PublicLayout>
      <VerifyEmailForm />
    </PublicLayout>
  );
};

export default VerifyEmail;
