import { gql } from '@apollo/client';

export const GET_FUNDING_WALLET = gql`
  query getFundingWallet {
    getFundingWallet {
      currency {
        type
        balance
        symbolImageUrl
        network
      }
      transfers {
        action
        amount
        currency
        createdAt
      }
    }
  }
`;
export const GET_TRANSACTION_HISTORY = gql`
  query transectionHistory {
    transectionHistory {
      action
      amount
      currency
      createdAt
    }
  }
`;
