import { gql } from '@apollo/client';

export const LIST_SUPPORTED_CRYPTO = gql`
  query listSupportedCrypto {
    listSupportedCrypto {
      type
      contractAddress
    }
  }
`;

export const GET_DEPOSIT_ADDRESS = gql`
  query getDepositAddressForCurrency($currency: String!) {
    getDepositAddressForCurrency(currency: $currency)
  }
`;
