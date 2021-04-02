import React from 'react';
import { updateCampaignState } from '../redux/slices/campaign';

export const reloadWindow = () => window.location.reload();

const getBase64 = (file: Blob, dispatch: any, type: string) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    if (reader.result) {
      if (type == 'raffle') {
        dispatch(updateCampaignState({ cat: 'config', key: 'raffleImage', val: reader.result }));
      } else if (type == 'campaign-image') {
        dispatch(updateCampaignState({ cat: 'image', key: 'image', val: reader.result }));
      }
    }
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
};

export const handleImage = (event: React.ChangeEvent, dispatch: any, type: string) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files != null && files.length) {
    const formData = new FormData();
    formData.append(files[0].name, files[0]);
    getBase64(files[0], dispatch, type);
  }
};
