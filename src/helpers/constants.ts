import usersIcon from '../assets/svg/tiers/users.svg';
import tagUser from '../assets/svg/tiers/tagUser.svg';
import tierOneIcon from '../assets/svg/tiers/activity.svg';

export const ADMIN_PANEL_TITLE = 'Raiinmaker Admin Panel';
export const ADMIN_PANEL_TAGLINE =
  'Your personal Dashboard to manage your Campaigns and get Insights through various Data Metrics.';

export const RAIINMAKER = 'raiinmaker';
export const APPROVED = 'APPROVED';

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const campaignTiersData = [
  {
    name: 'totalParticipants',
    image: tierOneIcon,
    description: 'Tier 1: Campaign Engagement',
    link: '/dashboard/campaign/engagement',
  },
  {
    name: 'totalUsers',
    image: usersIcon,
    description: 'Tier 2: Campaign Demographics',
    link: '',
  },
  {
    name: 'totalPosts',
    image: tagUser,
    description: 'Tier 3: Campaign by Channel',
    link: '/dashboard/campaign/channel/engagement',
  },
];
