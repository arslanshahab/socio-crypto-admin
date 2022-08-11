import React from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import PublicLayout from '../../layouts/PublicLayout';

const LoginPage: React.FC = () => {
  return (
    <PublicLayout>
      <LoginForm />
    </PublicLayout>
  );
};

export default LoginPage;
