export enum JsonRpcError {
  ResourceUnavailable = -32002,
}

export type JsonRpcRequestMethod = "eth_requestAccounts";

export type JsonRpcRequestParams<T extends JsonRpcRequestMethod> = T extends "eth_requestAccounts"
  ? []
  : unknown[];

export type JsonRpcResponse<T extends JsonRpcRequestMethod> = T extends "eth_requestAccounts"
  ? string[]
  : unknown;

// Interface for provider information following EIP-6963.
export interface EIP6963ProviderInfo {
  rdns: string; // Unique identifier for the wallet e.g io.metamask, io.metamask.flask
  uuid: string; // Globally unique ID to differentiate between provider sessions for the lifetime of the page
  name: string; // Human-readable name of the wallet
  icon: string; // URL to the wallet's icon
}

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

export interface EIP1193ProviderRpcError extends Error {
  code: EIP1193ProviderErrorCode;
  data?: unknown;
}

export interface EIP1193ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

export interface EIP1193ProviderConnectInfo {
  readonly chainId: string;
}

export interface EIP1193EthSubscriptionProviderMessage extends EIP1193ProviderMessage {
  readonly type: "eth_subscription";
  readonly data: {
    readonly subscription: string;
    readonly result: unknown;
  };
}

export enum EIP1193ProviderEventType {
  Message = "message",
  Connect = "connect",
  Disconnect = "disconnect",
  ChainChanged = "chainChanged",
  AccountsChanged = "accountsChanged",
}

export type EIP1193ProviderEvent<T extends EIP1193ProviderEventType> =
  T extends EIP1193ProviderEventType.Message
    ? EIP1193ProviderMessage
    : T extends EIP1193ProviderEventType.Connect
      ? EIP1193ProviderConnectInfo
      : T extends EIP1193ProviderEventType.Disconnect
        ? EIP1193ProviderRpcError
        : T extends EIP1193ProviderEventType.ChainChanged
          ? string // chainId
          : T extends EIP1193ProviderEventType.AccountsChanged
            ? string[] // addresses
            : never;

// Interface for Ethereum providers based on the EIP-1193 standard.
export interface EIP1193Provider {
  isStatus?: boolean; // Optional: Indicates the status of the provider
  host?: string; // Optional: Host URL of the Ethereum node
  path?: string; // Optional: Path to a specific endpoint or service on the host

  sendAsync?: <TMethod extends JsonRpcRequestMethod>(
    request: { method: TMethod; params?: JsonRpcRequestParams<TMethod> },
    callback: (error: Error | null, response: JsonRpcResponse<TMethod>) => void
  ) => void; // For sending asynchronous requests
  send?: <TMethod extends JsonRpcRequestMethod>(
    request: { method: TMethod; params?: JsonRpcRequestParams<TMethod> },
    callback: (error: Error | null, response: JsonRpcResponse<TMethod>) => void
  ) => void; // For sending synchronous requests
  request: <TMethod extends JsonRpcRequestMethod>(request: {
    method: TMethod;
    params?: JsonRpcRequestParams<TMethod>;
  }) => Promise<JsonRpcResponse<TMethod>>; // Standard method for sending requests per EIP-1193

  on: <T extends EIP1193ProviderEventType>(
    eventType: T,
    listener: (event: EIP1193ProviderEvent<T>) => void
  ) => this;
  removeListener: <T extends EIP1193ProviderEventType>(
    eventType: T,
    listener: (event: EIP1193ProviderEvent<T>) => void
  ) => this;
}

// Interface detailing the structure of provider information and its Ethereum provider.
export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo; // The provider's info
  provider: EIP1193Provider; // The EIP-1193 compatible provider
}

// Type representing the event structure for announcing a provider based on EIP-6963.
export type EIP6963AnnounceProviderEvent = CustomEvent<EIP6963ProviderDetail>;

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": EIP6963AnnounceProviderEvent;
  }
}
