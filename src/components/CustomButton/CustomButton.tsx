import React from 'react';
import './CustomButton.scss';
import { CircularProgress, ButtonProps } from '@material-ui/core';

interface CustomButtonProps {
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps & ButtonProps> = ({
  loading,
  className,
  children,
  onClick,
  disabled,
  type,
  ...others
}) => {
  return (
    <button
      className={`customButton ${className} ${disabled ? 'disabled' : ''}`}
      disabled={loading || disabled}
      onClick={onClick}
      type={type ? type : 'button'}
      {...others}
    >
      {loading ? <CircularProgress className="loader" size={28} thickness={5} /> : children}
    </button>
  );
};

export default CustomButton;
