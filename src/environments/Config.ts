export const Config = {
  ROAD_WAVE_API_BASE_URL: "https://localhost/api/data/",
  USER_API_BASE_URL: "https://localhost/api/user/",
  GOOGLE_MAPS_API_KEY: "",
  GOOGLE_OAUTH_CLIENT_ID: "",
  JWT_PUBLIC_KEY: "",
  ENABLE_SERVICE_WORKER: false,
  ENABLE_WEB_VITALS: false,
  DEBUG: true,
};

export type EnvironmentConfig = Readonly<typeof Config>;
