import { JsonRpcError, JsonRpcRequestMethod, JsonRpcRequestParams } from "./ethereumProvider";

export interface EthersUnknownError<T extends JsonRpcRequestMethod> {
  code: "UNKNOWN_ERROR";
  error: {
    code: JsonRpcError;
    payload: {
      method: T;
      params: JsonRpcRequestParams<T>;
    };
  };
}
