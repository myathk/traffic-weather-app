import axios from 'axios';
import { ITrafficLocation } from '../interfaces/ITrafficImages';
import { getAuthToken, IAuthTokenResponse } from './getAuthToken';

interface IGeocodeInfo {
  GeocodeInfo: IGeocodeObject[];
}

interface IGeocodeObject {
  LATITUDE: string;
  LONGITUDE: string;
  LONGITITUDE: string;
  ROAD: string;
  XCOORD: string;
  YCOORD: string;
}

const updateToken = async () => {
  try {
    const res: IAuthTokenResponse = await getAuthToken();
    localStorage.setItem('authToken', res.access_token);
    localStorage.setItem('expiryTime', res.expiry_timestamp);
  } catch (err) {
    console.log('Error from getAuthToken API: ', err);
  }
};

/**
 * calls OneMap API reverse geo-coding service to get nearest road for
 * given location in (lat, long)
 *
 * @param location location in (lat, long)
 * @returns Promise with nearest road name
 */
export const getRoadName = (location: ITrafficLocation) => {
  const callAPI = async () => {
    var token: string | null = localStorage.getItem('authToken');

    if (token) {
      const expiryTime: string | null = localStorage.getItem('expiryTime');

      if (expiryTime && Date.now() >= Number(expiryTime)) {
        //if token is expired already
        await updateToken();
      }
    } else {
      await updateToken();
    }

    token = localStorage.getItem('authToken');
    const { data } = await axios.get<IGeocodeInfo>(
      `${process.env.REACT_APP_ONEMAP_URL}location=${location.latitude},${location.longitude}&token=${token}`,
    );

    if (data.GeocodeInfo.length > 0) {
      return data.GeocodeInfo[0].ROAD;
    } else {
      return '';
    }
  };

  return callAPI();
};
