import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from '@material-ui/core';
import { TabPanel } from './TabPanel';
import { CardSetupForm } from './CardSetupForm';
import { AddEthAddress } from './AddEthAddress';
import { Elements } from '@stripe/react-stripe-js';
import { stripePubKey } from '../apiConfig.json';
import { loadStripe } from '@stripe/stripe-js';
import card from '../assets/svg/credit-card.svg';
import eth from '../assets/svg/eth-icon.svg';

interface Props {
  open: boolean;
  callback: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const stripeKey = (stripePubKey as { [key: string]: string })[env] as any;
const stripePromise = loadStripe(stripeKey);

export const AddPaymentMethod: React.FC<Props> = ({ open, setOpen, callback }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <Dialog open={open}>
      <DialogTitle>Add Payment Method</DialogTitle>
      <DialogContent>
        <Tabs
          value={value}
          variant={'fullWidth'}
          indicatorColor={'primary'}
          textColor={'primary'}
          onChange={handleChange}
        >
          <Tab label={'Card'} icon={<img src={card} height={60} width={60} alt={'USD'} />} {...a11yProps(0)} />
          <Tab label={'ETH'} icon={<img src={eth} height={60} width={60} alt={'USD'} />} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Elements stripe={stripePromise}>
            <CardSetupForm setOpen={setOpen} callback={callback} />
          </Elements>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddEthAddress setOpen={setOpen} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
