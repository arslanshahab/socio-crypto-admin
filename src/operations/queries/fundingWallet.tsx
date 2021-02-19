import { gql } from '@apollo/client';

export const GET_FUNDING_WALLET = gql`
  query getFundingWallet {
    getFundingWallet {
      currency {
        id
        type
        balance
      }
      transfers {
        amount
        action
        ethAddress
        currency
        withdrawStatus
        createdAt
      }
    }
  }
`;
