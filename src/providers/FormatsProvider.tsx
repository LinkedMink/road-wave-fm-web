import {
  Dispatch,
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { FORMATS_STATE_INITIAL, formatsReducer } from "../reducers/formatsReducer";
import { FormatsAction, FormatsState } from "../types/actionTypes";
import { HasChildrenProps } from "../types/reactUtilityTypes";
import { FormatsActionType } from "../definitions/dashboardConstants";
import { fetchAuthClient, isMessageResponse } from "../functions/fetchAuthClient";
import { ConfigContext } from "../environments/ConfigContext";
import { useAsync } from "react-use";
import { FormatViewModel } from "../types/responseModels";
import { AlertContext } from "./AlertProvider";
import { AlertActionType } from "../definitions/alertConstants";

const CACHE_LENGTH_MS = 7 * 24 * 60 * 60 * 1000;

export const FormatsContext = createContext<[FormatsState, Dispatch<FormatsAction>]>([
  FORMATS_STATE_INITIAL,
  (() => {}) as Dispatch<FormatsAction>,
]);

export const FormatsProvider: FunctionComponent<HasChildrenProps> = props => {
  const config = useContext(ConfigContext);
  const [_, alertDispatch] = useContext(AlertContext);
  const reducerState = useReducer(formatsReducer, FORMATS_STATE_INITIAL);
  const [formatsState, formatsDispatch] = reducerState;

  useEffect(() => formatsDispatch({ type: FormatsActionType.RESTORE }), [formatsDispatch]);

  useAsync(async () => {
    if (
      formatsState.lastUpdated === undefined ||
      formatsState.lastUpdated + CACHE_LENGTH_MS > Date.now()
    ) {
      return;
    }

    const response = await fetchAuthClient(new URL("formats", config.ROAD_WAVE_API_BASE_URL));
    if (isMessageResponse(response) || response.status !== 200) {
      alertDispatch({ type: AlertActionType.WARN, payload: "Failed to update formats list" });
      return;
    }

    const data = (await response.json()) as FormatViewModel[];
    formatsDispatch({ type: FormatsActionType.SAVE, payload: data });
  }, [config.ROAD_WAVE_API_BASE_URL, formatsState.lastUpdated, formatsDispatch]);

  return <FormatsContext.Provider value={reducerState}>{props.children}</FormatsContext.Provider>;
};
