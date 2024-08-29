export const Config = {
  GOOGLE_MAPS_API_KEY: "",
  GOOGLE_OAUTH_CLIENT_ID: "",
  ENABLE_SERVICE_WORKER: false,
  ENABLE_WEB_VITALS: false,
  DEBUG: true,
};

export type EnvironmentConfig = Readonly<typeof Config>;
