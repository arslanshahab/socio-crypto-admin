import { gql } from '@apollo/client';

export const CREATE_CAMPAIGN_REPORT = gql`
  mutation CreateCampaignReport($campaignId: String!) {
    generateCampaignAuditReport(campaignId: $campaignId) {
      totalClicks
      totalViews
      totalSubmissions
      totalRewardPayout
      flaggedParticipants {
        participantId
        viewPayout
        clickPayout
        submissionPayout
        totalPayout
      }
    }
  }
`;

export const SUBMIT_AUDIT_REPORT = gql`
  mutation SubmitAuditReport($campaignId: String!, $rejected: [String]!) {
    payoutCampaignRewards(campaignId: $campaignId, rejected: $rejected)
  }
`;

export const UPDATE_WITHDRAWAL_STATUS = gql`
  mutation UpdateWithdrawalStatuses($transferIds: [String]!, $status: String!) {
    updateWithdrawStatus(transferIds: $transferIds, status: $status) {
      id
    }
  }
`;

export const UPDATE_KYC_STATUS = gql`
  mutation UpdateKYCStatus($userId: String!, $status: String!) {
    updateKycStatus(userId: $userId, status: $status) {
      id
    }
  }
`;

export const ADMIN_GET_KYC_BY_USER = gql`
  query AdminGetKycByUser($userId: String!) {
    adminGetKycByUser(userId: $userId) {
      firstName
      lastName
      businessName
      address
      phoneNumber
      email
      paypalEmail
      idProof
      addressProof
    }
  }
`;

export const GET_PENDING_WITHDRAWALS = gql`
  query GetPendingWithdrawalsV2($status: String) {
    getWithdrawalsV2(status: $status) {
      transfers {
        id
        amount
        action
        createdAt
      }
      user {
        id
        username
        kycStatus
      }
      totalPendingWithdrawal
      totalAnnualWithdrawn
    }
  }
`;

export const ADMIN_LIST_CAMPAIGN_QUERY = gql`
  query ListCampaignsQuery($open: Boolean, $skip: Int, $take: Int, $scoped: Boolean) {
    listCampaigns(open: $open, skip: $skip, take: $take, scoped: $scoped) {
      results {
        id
        name
        endDate
        coiinTotal
        description
        audited
        participants {
          id
          participationScore
          metrics {
            clickCount
            viewCount
            submissionCount
          }
          user {
            id
          }
        }
      }
      total
    }
  }
`;
