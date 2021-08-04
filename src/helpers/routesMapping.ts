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
    { name: 'campaigns', to: '/dashboard/campaigns', icon: 'store', enabled: true },
    { name: 'market data', to: '/dashboard/marketData', icon: 'trending', enabled: true },
    { name: 'new campaign', to: '/dashboard/newCampaign', icon: 'add', enabled: true },
    {
      name: 'Admin',
      to: '/dashboard/admin',
      icon: 'assign',
      enabled: (data && data.company === 'raiinmaker') || false,
    },
    {
      name: 'Audit campaigns',
      to: '/dashboard/admin/audit-campaigns',
      icon: 'assign',
      enabled: (data && data.company === 'raiinmaker') || false,
    },
    {
      name: 'Manage Users',
      to: '/dashboard/admin/userManagement',
      icon: 'user',
      enabled: (data && data.company === 'raiinmaker') || false,
    },
    { name: 'FAQ', to: '', icon: 'question', enabled: true, href: faqUrl },
    { name: 'Contact Support', to: '', icon: 'support', enabled: true, href: supportEmail },
  ];
};
