import axios, { AxiosError } from 'axios';
import { urls } from '../apiConfig.json';
import {
  CampaignScoreTypes,
  CompleteEmailVerificationPayload,
  RegisterBrandPayload,
  SuccessResponse,
  FundingWallet,
  WithdrawPayload,
} from '../types';
import { StartEmailVerificationPayload } from '../types.d';

const env = process.env.REACT_APP_STAGE || 'local';
const SOMETHING_WENT_WRONG = 'Something went wrong!';

export class ApiClient {
  private static baseUrl = process.env.REACT_APP_LOCAL_URL || ((urls as { [key: string]: string })[env] as string);
  private static requestInstance = axios.create({
    withCredentials: true,
    baseURL: ApiClient.baseUrl,
  });

  public static async login(payload: { email: string; password: string }): Promise<any> {
    return (await this.requestInstance.post('/v1/auth/admin-login', payload)).data.data;
  }

  public static async startEmailVerification(payload: StartEmailVerificationPayload): Promise<SuccessResponse> {
    try {
      return (await this.requestInstance.post('/v1/auth/start-verification', payload)).data.data;
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message || SOMETHING_WENT_WRONG);
    }
  }

  public static async completeEmailVerification(
    payload: CompleteEmailVerificationPayload,
  ): Promise<{ verificationToken: string }> {
    try {
      return (await this.requestInstance.post('/v1/auth/complete-verification', payload)).data.data;
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message || SOMETHING_WENT_WRONG);
    }
  }

  public static async registerBrand(payload: RegisterBrandPayload): Promise<SuccessResponse> {
    try {
      return (await this.requestInstance.post('/v1/organization/register', payload)).data.data;
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message || SOMETHING_WENT_WRONG);
    }
  }

  public static async getFundingWallet(): Promise<FundingWallet[]> {
    try {
      return (await this.requestInstance.get('/v1/funding-wallet')).data.data;
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message || SOMETHING_WENT_WRONG);
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

  public static async getCampaignScore(campaignId: string): Promise<{ data: CampaignScoreTypes }> {
    try {
      return await (
        await this.requestInstance.get(`/v1/social/campaign-score/${campaignId}`)
      ).data;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }

  public static async withdrawFunds(payload: WithdrawPayload): Promise<SuccessResponse> {
    try {
      return (await this.requestInstance.post('/v1/tatum/admin/withdraw', payload)).data.data;
    } catch (error) {
      throw new Error((error as AxiosError).response?.data.message || SOMETHING_WENT_WRONG);
    }
  }
}
