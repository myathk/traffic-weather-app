import axios from 'axios';

export interface IAuthTokenResponse {
  access_token: string;
  expiry_timestamp: string;
}

export const getAuthToken = (): Promise<IAuthTokenResponse> => {
  const data = JSON.stringify({
    email: process.env.REACT_APP_ONEMAP_USERNAME,
    password: process.env.REACT_APP_ONEMAP_PASSWORD,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_ONEMAP_URL,
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
