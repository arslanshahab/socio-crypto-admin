import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import card from '../assets/svg/credit-card.svg';
import eth from '../assets/svg/eth-icon.svg';
import { TabPanel } from './TabPanel';
import { StripePurchaseForm } from './StripePurchaseForm';
import { coldWallet } from './PaymentsAccount';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount?: number;
}

export const PurchaseDialog: React.FC<Props> = ({ open, setOpen, amount }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogContent>
        {amount && amount <= 0 ? (
          <div>
            <DialogContentText>All your campaigns are funded, or you must select a campaign to fund.</DialogContentText>
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant={'contained'}>
                Okay
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div>
            <Tabs
              value={value}
              variant={'fullWidth'}
              indicatorColor={'primary'}
              textColor={'primary'}
              onChange={handleChange}
            >
              <Tab label={'ETH'} icon={<img src={eth} height={60} width={60} alt={'USD'} />} {...a11yProps(0)} />
              <Tab label={'Card'} icon={<img src={card} height={60} width={60} alt={'USD'} />} {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <DialogContentText>
                Please send funds from one of your claimed addresses to this address:
              </DialogContentText>
              <DialogContentText>{coldWallet}</DialogContentText>
              <DialogActions>
                <Button onClick={handleClose} color="primary" variant={'contained'}>
                  Okay
                </Button>
              </DialogActions>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <StripePurchaseForm setOpen={setOpen} givenAmount={amount} />
            </TabPanel>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
