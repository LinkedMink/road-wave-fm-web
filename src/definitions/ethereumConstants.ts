export enum EIP1193ProviderErrorCode {
  /**
   * The user rejected the request.
   */
  UserRejectedRequest = 4001,
  /**
   * The requested method and/or account has not been authorized by the user.
   */
  Unauthorized = 4100,
  /**
   * The Provider does not support the requested method.
   */
  UnsupportedMethod = 4200,
  /**
   * The Provider is disconnected from all chains.
   */
  Disconnected = 4900,
  /**
   * The Provider is not connected to the requested chain.
   */
  ChainDisconnected = 4901,
}

export enum JsonRpcError {
  ResourceUnavailable = -32002,
  Unknown,
}

export enum EIP1193ProviderEventType {
  Message = "message",
  Connect = "connect",
  Disconnect = "disconnect",
  ChainChanged = "chainChanged",
  AccountsChanged = "accountsChanged",
}
