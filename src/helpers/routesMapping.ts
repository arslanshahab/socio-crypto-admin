import { faqUrl, supportEmail } from './affiliateURLs';

interface MenuObject {
  name: string;
  to: string;
  icon: string;
  enabled: boolean;
  href?: string;
}

export const getRoutesMapping = (data: any): Array<MenuObject> => {
  return [
    { name: 'dashboard', to: '/dashboard', icon: 'dashboard', enabled: true },
    { name: 'campaigns', to: '/dashboard/campaigns', icon: 'campaign', enabled: true },
    { name: 'market data', to: '/dashboard/marketData', icon: 'trending', enabled: false },
    { name: 'Add campaign', to: '/dashboard/newCampaign', icon: 'newCampaign', enabled: true },
    { name: 'Add Crypto', to: '/dashboard/paymentsAccount', icon: 'crypto', enabled: true },
    {
      name: 'Admin',
      to: '/dashboard/admin/management',
      icon: 'admin',
      enabled: (data && data.company === 'raiinmaker') || false,
    },
    // {
    //   name: 'Audit campaigns',
    //   to: '/dashboard/admin/audit-campaigns',
    //   icon: 'assign',
    //   enabled: (data && data.company === 'raiinmaker') || false,
    // },
    {
      name: 'Management',
      to: '/dashboard/admin/userManagement',
      icon: 'user',
      enabled: (data && data.company === 'raiinmaker') || false,
    },
    {
      name: 'User List',
      to: '/dashboard/admin/userList',
      icon: 'user',
      enabled: (data && data.company === 'raiinmaker') || false,
    },
  ];
};

export const geToolRoutes = () => {
  return [
    { name: 'Setting', to: '', icon: 'setting', enabled: true },
    { name: 'FAQ', to: '', icon: 'faq', enabled: true, href: faqUrl },
    { name: 'Help & Support', to: '', icon: 'support', enabled: true, href: supportEmail },
    { name: 'Logout', to: '', icon: 'logout', enabled: true },
  ];
};
