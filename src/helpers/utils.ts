import React from 'react';
import { updateCampaignState } from '../redux/slices/campaign';

export const reloadWindow = () => window.location.reload();

const getBase64 = (file: Blob, dispatch: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    if (reader.result) {
      dispatch(updateCampaignState({ cat: 'config', key: 'raffleImage', val: reader.result }));
    }
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
};

export const handleImage = (dispatch: any) => (event: React.ChangeEvent) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files != null && files.length) {
    const formData = new FormData();
    formData.append(files[0].name, files[0]);
    getBase64(files[0], dispatch);
  }
};
