import React from 'react';
import SignupForm from '../../components/Forms/SignupForm';
import PublicLayout from '../../layouts/PublicLayout';

const LoginPage: React.FC = () => {
  return (
    <PublicLayout>
      <SignupForm />
    </PublicLayout>
  );
};

export default LoginPage;
