import { gql } from '@apollo/client';

export const LIST_SUPPORTED_CRYPTO = gql`
  query listSupportedCrypto {
    listSupportedCrypto {
      type
      contractAddress
    }
  }
`;
