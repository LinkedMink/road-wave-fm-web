import { JsonRpcSigner } from "ethers";
import { FunctionComponent, createContext } from "react";
import { HasChildrenProps } from "../../../types/reactUtilityTypes";

export type EthereumLoginProviderProps = HasChildrenProps & {
  context: EthereumLoginContextState;
};

export type EthereumLoginContextState = {
  signer: JsonRpcSigner;
  address: string;
};

export const EthereumLoginContext = createContext<EthereumLoginContextState>(
  {} as EthereumLoginContextState
);

export const EthereumLoginProvider: FunctionComponent<EthereumLoginProviderProps> = props => (
  <EthereumLoginContext.Provider value={props.context}>
    {props.children}
  </EthereumLoginContext.Provider>
);
