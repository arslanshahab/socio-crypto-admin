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

export const DELETE_CAMPAIGN = gql`
  mutation DeleteCampaign($id: String!) {
    deleteCampaign(id: $id) {
      name
    }
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
        ethAddress
        paypalAddress
        currency
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

export const GET_WITHDRAWAL_HISTORY = gql`
  query getWithdrawalHistory {
    getWithdrawalHistory {
      id
      amount
      action
      withdrawStatus
      createdAt
      ethAddress
      paypalAddress
    }
  }
`;

export const ADMIN_LIST_CAMPAIGN_QUERY = gql`
  query ListCampaignsQuery(
    $open: Boolean
    $skip: Int
    $take: Int
    $scoped: Boolean
    $approved: Boolean
    $pendingAudit: Boolean
  ) {
    listCampaigns(
      open: $open
      skip: $skip
      take: $take
      scoped: $scoped
      approved: $approved
      pendingAudit: $pendingAudit
    ) {
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

export const LIST_ORGS = gql`
  query listOrgs($skip: Int, $take: Int) {
    listOrgs(skip: $skip, take: $take) {
      name
      createdAt
      campaignCount
      adminCount
    }
  }
`;
export const ORG_DETAILS = gql`
  query getOrgDetails($skip: Int, $take: Int) {
    listOrgs(skip: $skip, take: $take) {
      name
      createdAt
      campaignCount
      adminCount
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($password: String!) {
    updatePassword(password: $password)
  }
`;

export const LIST_EMPLOYEES = gql`
  query listEmployees {
    listEmployees {
      orgName
      adminsDetails {
        name
        createdAt
      }
    }
  }
`;

export const NEW_USER = gql`
  mutation newUser($name: String!, $email: String!, $role: String!) {
    newUser(name: $name, email: $email, role: $role)
  }
`;

export const NEW_ORG = gql`
  mutation newOrg($orgName: String!, $email: String!, $name: String!) {
    newOrg(orgName: $orgName, email: $email, name: $name)
  }
`;
