import { Container, Typography } from "@mui/material";
import { BrowserProvider } from "ethers/providers";
import { FunctionComponent, useCallback, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAsync } from "react-use";
import { AlertActionType } from "../../../definitions/alertConstants";
import { EIP1193ProviderErrorCode, JsonRpcError } from "../../../definitions/ethereumConstants";
import { isEIP1193ProviderError, isEthersUnknownError } from "../../../functions/errorTypeCheck";
import { AlertContext } from "../../shared/AlertProvider";
import { EIP6963ProviderDetail } from "../../../types/ethereumProvider";
import { NavigationBackdrop } from "../../shared/NavigationBackdrop";
import { PagePaper } from "../../shared/PagePaper";
import { EthereumLoginProvider } from "./EthereumLoginProvider";
import { EthereumProviderList } from "./EthereumProviderList";

const Messages = {
  WARN_PENDING:
    "There's already a pending request to connect the wallet. Please check your wallet notifications.",
  WARN_REJECTED:
    "You've rejected the request to connect your wallet. You must accept to login with Ethereum.",
} as const;

export const LoginWithEthereumPage: FunctionComponent = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail | null>(null);
  const [_, dispatchAlert] = useContext(AlertContext);
  const navigate = useNavigate();

  const getConnectedSigner = useCallback(async () => {
    if (!selectedWallet) {
      return null;
    }

    const browserProvider = new BrowserProvider(selectedWallet.provider);
    try {
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();

      return {
        signer,
        address,
      };
    } catch (error) {
      console.error(error);

      if (isEthersUnknownError(error) && error.error.code === JsonRpcError.ResourceUnavailable) {
        dispatchAlert({
          type: AlertActionType.WARN,
          payload: Messages.WARN_PENDING,
        });
      } else if (
        isEIP1193ProviderError(error) &&
        error.code === EIP1193ProviderErrorCode.UserRejectedRequest
      ) {
        dispatchAlert({
          type: AlertActionType.WARN,
          payload: Messages.WARN_REJECTED,
        });
        setSelectedWallet(null);
      }

      return null;
    }
  }, [selectedWallet, dispatchAlert, setSelectedWallet]);

  const loginContext = useAsync(async () => {
    const context = await getConnectedSigner();

    if (context) {
      navigate("/login/ethereum/init");
    }

    return context;
  }, [selectedWallet, navigate]);

  return (
    <Container maxWidth="sm">
      <NavigationBackdrop />
      {!loginContext.loading && loginContext.value && (
        <EthereumLoginProvider context={loginContext.value}>
          <Outlet />
        </EthereumLoginProvider>
      )}

      <PagePaper>
        <Typography variant="h3">Sign in with Ethereum</Typography>
        <EthereumProviderList
          selectedWallet={selectedWallet}
          onSelectedWallet={setSelectedWallet}
        />
      </PagePaper>
    </Container>
  );
};
