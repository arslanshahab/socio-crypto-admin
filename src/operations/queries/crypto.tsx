import { gql } from '@apollo/client';

export const LIST_SUPPORTED_CRYPTO = gql`
  query listSupportedCrypto {
    listSupportedCrypto {
      type
      contractAddress
    }
  }
`;

export const LIST_CURRENCIES = gql`
  query getSupportedCurrencies {
    getSupportedCurrencies
  }
`;

export const GET_DEPOSIT_ADDRESS = gql`
  query getDepositAddressForSymbol($symbol: String!) {
    getDepositAddressForSymbol(symbol: $symbol) {
      symbol
      address
      fromTatum
      memo
      message
      destinationTag
    }
  }
`;
