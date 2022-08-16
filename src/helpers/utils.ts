import {
  CampaignMediaResponse,
  CampaignTemplateResponse,
  ChannelMediaObject,
  ChannelMediaStructure,
  ChannelTemplateObject,
  ChannelTemplateStructure,
  FileObject,
} from '../types';
import axios from 'axios';
import { dataURLtoFile } from './fileHandler';
import { flatten } from 'lodash';
import { s3ProdMediaUrl, s3StagingMediaUrl } from './affiliateURLs';

const assetUrl = process.env.REACT_APP_STAGE === 'production' ? s3ProdMediaUrl : s3StagingMediaUrl;

export const generateRandomId = (): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const stringLength = 20;
  function pickRandom() {
    return possible[Math.floor(Math.random() * possible.length)];
  }
  return [...Array(stringLength)].map(pickRandom).join('');
};

export const generateCampaignMediaUrl = (id: string, filename: string): string => {
  console.log(`generating url for ${process.env.REACT_APP_STAGE} environment`);
  return `${assetUrl}/campaign/${id}/${filename}`;
};

export const uploadMedia = async (
  url: string,
  file: FileObject,
  progressCallback: (p: number) => void,
): Promise<void> => {
  await axios({
    method: 'PUT',
    url: url,
    data: dataURLtoFile(file.file, file.filename),
    headers: {
      'Content-Type': file.format,
    },
    onUploadProgress: (event) => {
      const progress = ((event.loaded / event.total) * 100).toFixed(0);
      progressCallback(parseFloat(progress));
    },
  });
};

export const uploadImage = async (
  url: string,
  file: FileObject,
  progressCallback: (p: number) => void,
): Promise<void> => {
  debugger;
  await axios({
    method: 'PUT',
    url: url,
    data: file,
    headers: {
      'Content-Type': file.format,
    },
    onUploadProgress: (event) => {
      const progress = ((event.loaded / event.total) * 100).toFixed(0);
      progressCallback(parseFloat(progress));
    },
  });
};

export const prepareMediaRequest = (data: ChannelMediaStructure): CampaignMediaResponse[] => {
  const list: CampaignMediaResponse[] = [];
  const mediaList = flatten(Object.values(data));
  mediaList.forEach((item) => {
    const obj: CampaignMediaResponse = {
      ...(item.id && { id: item.id }),
      channel: item.channel,
      media: item.media.filename,
      mediaFormat: item.media.format,
      isDefault: item.isDefault,
    };
    list.push(obj);
  });
  return list;
};

export const prepareTemplateRequest = (data: ChannelTemplateStructure): CampaignTemplateResponse[] => {
  const list: CampaignTemplateResponse[] = [];
  const templateList = flatten(Object.values(data));
  templateList.forEach((item) => {
    const obj: CampaignTemplateResponse = {
      ...(item.id && { id: item.id }),
      channel: item.channel,
      post: item.channel === 'Twitter' ? item.post.replace('@', '#') : item.post,
    };
    list.push(obj);
  });
  return list;
};

export const prepareChannelMediaFromResponse = (
  initData: ChannelMediaStructure,
  id: string,
  list: CampaignMediaResponse[],
): ChannelMediaStructure => {
  if (list) {
    list.forEach((item) => {
      const obj: ChannelMediaObject = {
        ...(item.id && { id: item.id }),
        isDefault: item.isDefault,
        channel: item.channel,
        media: { file: generateCampaignMediaUrl(id, item.media), filename: item.media, format: item.mediaFormat },
      };
      if (obj.isDefault) {
        const mediaList = [...initData[item.channel]];
        const findDefaultIndex = mediaList.findIndex((item) => item.isDefault);
        mediaList[findDefaultIndex] = obj;
        initData[item.channel] = mediaList;
      } else {
        const mediaList = [...initData[item.channel]];
        mediaList.push(obj);
        initData[item.channel] = mediaList;
      }
    });
  }
  return initData;
};

export const prepareChannelTemplatesFromResponse = (
  initData: ChannelTemplateStructure,
  list: CampaignTemplateResponse[],
): ChannelTemplateStructure => {
  if (list) {
    list.forEach((item) => {
      const obj: ChannelTemplateObject = {
        ...(item.id && { id: item.id }),
        channel: item.channel,
        post: item.post,
      };
      let templateList = [...initData[item.channel]];
      templateList.push(obj);
      templateList = templateList.filter((item) => item.id);
      initData[item.channel] = templateList;
    });
  }
  return initData;
};

export const chartColors = ['#e4485c', '#1d40ad', '#f80aec', '#f8e80a', '#026b14'];
