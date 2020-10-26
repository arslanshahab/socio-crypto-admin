import { gql } from '@apollo/client';

export const CLAIM_WALLET = gql`
  mutation claimEthereumAddress($ethereumAddress: String!, $signature: String!) {
    claimEthereumAddress(ethereumAddress: $ethereumAddress, signature: $signature) {
      ethereumAddress
      message
      claimed
      balance
    }
  }
`;

export const ATTACH_WALLET = gql`
  mutation attachEthereumAddress($ethereumAddress: String!) {
    attachEthereumAddress(ethereumAddress: $ethereumAddress) {
      ethereumAddress
      message
      claimed
      balance
    }
  }
`;
