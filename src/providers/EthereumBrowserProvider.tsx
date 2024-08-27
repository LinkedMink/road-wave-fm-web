import { BrowserProvider } from "ethers";
import { FunctionComponent, createContext, useMemo } from "react";
import { EIP6963ProviderDetail } from "../types/ethereum";
import { HasChildrenProps } from "../types/reactUtilityTypes";

export type EthereumBrowserProviderProps = HasChildrenProps & {
  detail: EIP6963ProviderDetail;
};

export type EthereumBrowserContextState = {
  browserProvider: BrowserProvider;
  detail: EIP6963ProviderDetail;
};

export const EthereumBrowserContext = createContext<EthereumBrowserContextState>(
  {} as EthereumBrowserContextState
);

export const EthereumBrowserProvider: FunctionComponent<EthereumBrowserProviderProps> = props => {
  const state = useMemo(
    () => ({
      browserProvider: new BrowserProvider(props.detail.provider),
      detail: props.detail,
    }),
    [props.detail]
  );

  return (
    <EthereumBrowserContext.Provider value={state}>
      {props.children}
    </EthereumBrowserContext.Provider>
  );
};
