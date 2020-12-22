import { gql } from '@apollo/client';

export const ADD_PAYMENT_METHOD = gql`
  mutation addPaymentMethod {
    addPaymentMethod {
      clientSecret
    }
  }
`;

export const CHARGE_PAYMENT_METHOD = gql`
  mutation chargePaymentMethod($amount: Float!, $paymentMethodId: String!) {
    chargePaymentMethod(amount: $amount, paymentMethodId: $paymentMethodId) {
      clientSecret
    }
  }
`;
