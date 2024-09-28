import type { EIP1193ProviderRpcError, JsonRpcRequestMethod } from "../types/ethereumProvider";
import type { EthersUnknownError } from "../types/ethers";

export function isEIP1193ProviderError(value: unknown): value is EIP1193ProviderRpcError {
  return !!(value as EIP1193ProviderRpcError).code;
}

export function isEthersUnknownError(
  value: unknown
): value is EthersUnknownError<JsonRpcRequestMethod> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (value as EthersUnknownError<JsonRpcRequestMethod>)?.code === "UNKNOWN_ERROR";
}
