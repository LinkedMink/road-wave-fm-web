export type Eip1193RequestMethod = "eth_requestAccounts";

export type Eip1193RequestParams<T extends Eip1193RequestMethod> = T extends "eth_requestAccounts"
  ? []
  : unknown[];

export type Eip1193RequestResult<T extends Eip1193RequestMethod> = T extends "eth_requestAccounts"
  ? string[]
  : unknown;

// Interface for provider information following EIP-6963.
export interface EIP6963ProviderInfo {
  walletId: string; // Unique identifier for the wallet e.g io.metamask, io.metamask.flask
  uuid: string; // Globally unique ID to differentiate between provider sessions for the lifetime of the page
  name: string; // Human-readable name of the wallet
  icon: string; // URL to the wallet's icon
}

// Interface for Ethereum providers based on the EIP-1193 standard.
export interface EIP1193Provider {
  isStatus?: boolean; // Optional: Indicates the status of the provider
  host?: string; // Optional: Host URL of the Ethereum node
  path?: string; // Optional: Path to a specific endpoint or service on the host
  sendAsync?: (
    request: { method: string; params?: unknown[] },
    callback: (error: Error | null, response: unknown) => void
  ) => void; // For sending asynchronous requests
  send?: (
    request: { method: string; params?: unknown[] },
    callback: (error: Error | null, response: unknown) => void
  ) => void; // For sending synchronous requests
  request: <TMethod extends Eip1193RequestMethod>(request: {
    method: TMethod;
    params?: Eip1193RequestParams<TMethod>;
  }) => Promise<Eip1193RequestResult<TMethod>>; // Standard method for sending requests per EIP-1193
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
