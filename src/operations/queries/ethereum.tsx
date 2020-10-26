import { gql } from '@apollo/client';

export const GET_EXTERNAL_ADDRESS = gql`
  query getExternalAddress($ethereumAddress: String!) {
    getExternalAddress(ethereumAddress: $ethereumAddress) {
      ethereumAddress
      message
      claimed
      balance
    }
  }
`;

export const LIST_EXTERNAL_ADDRESSES = gql`
  query listExternalAddresses {
    listExternalAddresses {
      ethereumAddress
      message
      claimed
      balance
    }
  }
`;
