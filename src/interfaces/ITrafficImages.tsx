export interface ITrafficImagesResponse {
  api_info: {
    status: 'healthy';
  };
  items: ITrafficItems[];
}

export interface ITrafficItems {
  timestamp: String;
  cameras: ITrafficCamera[];
}

export interface ITrafficCamera {
  timestamp: String;
  camera_id: number;
  image_id: number;
  image: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
  location: ITrafficLocation;
}

export interface ITrafficLocation {
  latitude: number;
  longitude: number;
}
