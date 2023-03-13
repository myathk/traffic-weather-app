import axios from 'axios';

export interface IAuthTokenResponse {
  access_token: string;
  expiry_timestamp: string;
}

/**
 * calls API to get auth token needed to use OneMap API. CORS server is needed
 * to access this endpoint
 *
 * @returns Promise with auth token response
 */
export const getAuthToken = (): Promise<IAuthTokenResponse> => {
  const data = JSON.stringify({
    email: process.env.REACT_APP_ONEMAP_USERNAME,
    password: process.env.REACT_APP_ONEMAP_PASSWORD,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_ONEMAP_TOKEN_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const callAPI = async (): Promise<IAuthTokenResponse> => {
    const { data } = await axios(config);
    return data;
  };

  return callAPI();
};
