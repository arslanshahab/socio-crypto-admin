import React, { useState } from 'react';
import { Dialog, DialogContent, Tab, Tabs, useMediaQuery, useTheme } from '@material-ui/core';
import card from '../assets/svg/credit-card.svg';
// import eth from '../assets/svg/eth-icon.svg';
import { TabPanel } from './TabPanel';
import { StripePurchaseForm } from './StripePurchaseForm';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount?: number;
  balance?: number;
}

export const PurchaseDialog: React.FC<Props> = ({ open, setOpen, amount, balance }) => {
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
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <DialogContent>
        <Tabs
          value={value}
          variant={'fullWidth'}
          indicatorColor={'primary'}
          textColor={'primary'}
          onChange={handleChange}
        >
          {/* <Tab label={'ETH'} icon={<img src={eth} height={60} width={60} alt={'USD'} />} {...a11yProps(0)} /> */}
          <Tab label={'Card'} icon={<img src={card} height={60} width={60} alt={'USD'} />} {...a11yProps(0)} />
        </Tabs>
        {/* <TabPanel value={value} index={0}>
          {amount && balance ? (
            <div>
              <DialogContentText>
                Please send {amount && balance ? amount - balance : amount} Coiin from one of your claimed addresses to
                this address:
              </DialogContentText>
              <DialogContentText>{coldWallet}</DialogContentText>
            </div>
          ) : (
            <div>
              <DialogContentText>
                Please send Coiin from one of your claimed addresses to this address:
              </DialogContentText>
              <DialogContentText>{coldWallet}</DialogContentText>
            </div>
          )}
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant={'contained'}>
              Okay
            </Button>
          </DialogActions>
        </TabPanel> */}
        <TabPanel value={value} index={0}>
          <StripePurchaseForm setOpen={setOpen} givenAmount={amount && balance ? amount - balance : amount} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
