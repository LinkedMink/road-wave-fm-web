import {
  Dispatch,
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useAsync } from "react-use";
import { AlertActionType } from "../../../definitions/alertConstants";
import { FormatsActionType } from "../../../definitions/dashboardConstants";
import { fetchAuthClient, isMessageResponse } from "../../../functions/fetchAuthClient";
import { FORMATS_STATE_INITIAL, formatsReducer } from "../../../reducers/formatsReducer";
import { FormatsAction, FormatsState } from "../../../types/actionTypes";
import { HasChildrenProps } from "../../../types/reactUtilityTypes";
import { FormatViewModel } from "../../../types/responseModels";
import { AlertContext } from "../../shared/AlertProvider";

const CACHE_LENGTH_MS = 7 * 24 * 60 * 60 * 1000;

export const FormatsContext = createContext<[FormatsState, Dispatch<FormatsAction>]>([
  FORMATS_STATE_INITIAL,
  (() => {}) as Dispatch<FormatsAction>,
]);

export const FormatsProvider: FunctionComponent<HasChildrenProps> = props => {
  const [_, alertDispatch] = useContext(AlertContext);
  const reducerState = useReducer(formatsReducer, FORMATS_STATE_INITIAL);
  const [formatsState, formatsDispatch] = reducerState;

  useEffect(() => {
    formatsDispatch({ type: FormatsActionType.RESTORE });
  }, [formatsDispatch]);

  useAsync(async () => {
    if (
      formatsState.lastUpdated === undefined ||
      formatsState.lastUpdated + CACHE_LENGTH_MS > Date.now()
    ) {
      return;
    }

    const response = await fetchAuthClient("/api/data/format.list");
    if (isMessageResponse(response) || response.status !== 200) {
      alertDispatch({ type: AlertActionType.WARN, payload: "Failed to update formats list" });
      return;
    }

    const body = (await response.json()) as { result: { data: FormatViewModel[] } };
    formatsDispatch({ type: FormatsActionType.SAVE, payload: body.result.data });
  }, [formatsState.lastUpdated, formatsDispatch]);

  return <FormatsContext.Provider value={reducerState}>{props.children}</FormatsContext.Provider>;
};
