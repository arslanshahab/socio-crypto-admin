import { gql } from '@apollo/client';

export const ADD_PAYMENT_METHOD = gql`
  mutation addPaymentMethod {
    addPaymentMethod {
      clientSecret
    }
  }
`;

export const CHARGE_PAYMENT_METHOD = gql`
  mutation purchaseCoiin($amount: Float!, $paymentMethodId: String!) {
    purchaseCoiin(amount: $amount, paymentMethodId: $paymentMethodId) {
      clientSecret
    }
  }
`;
