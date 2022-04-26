export type UserListType = {
  id: string;
  email: string | null;
  createdAt: string;
  kycStatus: string | null;
  lastLogin: string;
  active: boolean;
  profile: UserProfileType;
  social_post: SocialPostType;
};
export type UserDetailsProps = {
  id: string;
  email: string | null;
  createdAt: string;
  kycStatus: string | null;
  lastLogin: string;
  active: boolean;
  profile: UserProfileType;
  social_post: SocialPostType;
  userStatus: (value: { userAction: boolean; modal: boolean }) => void;
};
export type UserProfileType = {
  city: string | null;
  country: string | null;
  state: string | null;
  username: string;
};
export type SocialPostType = {
  [key: string]: {
    id: string;
    userId: string;
  };
};
export type RedemptionTypes = {
  orderLimitForTwentyFourHoursReached: boolean;
  participation: boolean;
  twitterLinked: boolean;
  twitterfollowers: number;
  twitterfollowersRequirement: number;
};
export type CurrencyTypes = {
  balance: string;
  imageUrl: string;
  minWithdrawAmount: number;
  network: string;
  symbol: string;
  usdBalance: number;
};
