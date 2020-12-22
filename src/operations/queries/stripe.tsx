import { gql } from '@apollo/client';

export const LIST_PAYMENT_METHODS = gql`
  query listPaymentMethods {
    listPaymentMethods {
      id
      last4
      brand
    }
  }
`;
