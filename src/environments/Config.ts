export const Config = {
  ROAD_WAVE_API_BASE_URL: "http://localhost:8080",
  USER_API_BASE_URL: "http://localhost:8081",
  GOOGLE_MAPS_API_KEY: "",
  GOOGLE_OAUTH_CLIENT_ID: "",
  JWT_PUBLIC_KEY: "",
  ENABLE_SERVICE_WORKER: false,
  ENABLE_WEB_VITALS: false,
  DEBUG: true,
  LOG_LEVEL_CONSOLE: 0,
  LOG_LEVEL_PERSIST: 0,
};

export type EnvironmentConfig = Readonly<typeof Config>;
