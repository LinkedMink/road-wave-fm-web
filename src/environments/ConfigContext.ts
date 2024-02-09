import { createContext } from "react";
import { Config, EnvironmentConfig } from "./Config";

export const ConfigContext = createContext<EnvironmentConfig>(Config);
