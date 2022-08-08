import React, { Fragment } from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export const CardSection: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const handleOnChange = (e: any) => {
    if (e.error) return setError(e.error.message);
    setError(null);
  };
  return (
    <Fragment>
      <label>
        <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleOnChange} />
      </label>
      {error && <p className="text-xs text-red-600 mt-3 mb-0">The credit card you have entered is invalid</p>}
    </Fragment>
  );
};
