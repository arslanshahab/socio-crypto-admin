import { gql } from '@apollo/client';

export const REGISTER_CRYPTO = gql`
  mutation registerNewCrypto($name: String!, $contractAddress: String) {
    registerNewCrypto(name: $name, contractAddress: $contractAddress) {
      type
      balance
    }
  }
`;

export const ADD_CRYPTO_TO_WALLET = gql`
  mutation addCryptoToWallet($contractAddress: String!) {
    addCryptoToWallet(contractAddress: $contractAddress) {
      type
      balance
    }
  }
`;

export const DELETE_CRYPTO_FROM_WALLET = gql`
  mutation deleteCryptoFromWallet($id: String!) {
    deleteCryptoFromWallet(id: $id)
  }
`;
