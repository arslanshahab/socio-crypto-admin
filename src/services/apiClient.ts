import axios from 'axios';
import { urls } from '../apiConfig.json';
import { CompleteEmailVerificationPayload, RegisterBrandPayload, SuccessResponse } from '../types';
import { StartEmailVerificationPayload } from '../types.d';

const env = process.env.REACT_APP_STAGE || 'local';

export class ApiClient {
  private static baseUrl = process.env.REACT_APP_LOCAL_URL || ((urls as { [key: string]: string })[env] as string);
  private static requestInstance = axios.create({
    withCredentials: true,
    baseURL: ApiClient.baseUrl,
  });

  public static async startEmailVerification(payload: StartEmailVerificationPayload): Promise<SuccessResponse> {
    try {
      return (await this.requestInstance.post('/v1/auth/start-verification', payload)).data;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }

  public static async completeEmailVerification(
    payload: CompleteEmailVerificationPayload,
  ): Promise<{ data: { verificationToken: string } }> {
    try {
      return (await this.requestInstance.post('/v1/auth/complete-verification', payload)).data;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }

  public static async registerBrand(payload: RegisterBrandPayload): Promise<SuccessResponse> {
    try {
      return (await this.requestInstance.post('/v1/organization/register', payload)).data;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }

  public static async getCampaignPostCount(campaignId: string): Promise<{ data: { count: number } }> {
    try {
      return (await this.requestInstance.get(`/v1/social/posts/${campaignId}`)).data;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }
}
