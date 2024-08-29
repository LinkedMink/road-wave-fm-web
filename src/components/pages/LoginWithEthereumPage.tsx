/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { BrowserProvider } from "ethers";
import { FunctionComponent, useCallback, useContext, useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAsync } from "react-use";
import { AlertActionType } from "../../definitions/alertConstants";
import { useEthereumWalletProviders } from "../../hooks/useEthereumWalletProviders";
import { AlertContext, AlertProvider } from "../../providers/AlertProvider";
import { EthereumLoginProvider } from "../../providers/EthereumLoginProvider";
import {
  EIP1193ProviderErrorCode,
  EIP1193ProviderRpcError,
  EIP6963ProviderDetail,
  JsonRpcError,
  JsonRpcRequestMethod,
  JsonRpcRequestParams,
} from "../../types/ethereumProvider";
import { PagePaper } from "../styled/PagePaper";

const Messages = {
  WARN_PENDING:
    "There's already a pending request to connect the wallet. Please check your wallet notifications.",
  WARN_REJECTED:
    "You've rejected the request to connect your wallet. You must accept to login with Ethereum.",
} as const;

interface EthersUnknownError<T extends JsonRpcRequestMethod> {
  code: "UNKNOWN_ERROR";
  error: {
    code: JsonRpcError;
    payload: {
      method: T;
      params: JsonRpcRequestParams<T>;
    };
  };
}

function isEIP1193ProviderError(value: unknown): value is EIP1193ProviderRpcError {
  return !!(value as EIP1193ProviderRpcError).code;
}

function isEthersUnknownError(value: unknown): value is EthersUnknownError<JsonRpcRequestMethod> {
  return (value as EthersUnknownError<JsonRpcRequestMethod>)?.code === "UNKNOWN_ERROR";
}

export const LoginWithEthereumPage: FunctionComponent = () => {
  const ethereumProviders = useEthereumWalletProviders();
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail | null>(null);
  const [_, dispatchAlert] = useContext(AlertContext);
  const navigate = useNavigate();

  const connectWallet = useCallback(async () => {
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
      } else if (isEIP1193ProviderError(error) && EIP1193ProviderErrorCode.UserRejectedRequest) {
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
    const context = await connectWallet();

    if (context) {
      navigate("/login/ethereum/init");
    }

    return context;
  }, [selectedWallet, navigate]);

  const ethereumProvidersElements = useMemo(
    () =>
      ethereumProviders.map(p => (
        <ListItem
          key={p.info.uuid}
          disablePadding
        >
          <ListItemButton onClick={() => setSelectedWallet(p)}>
            <ListItemIcon>
              <img
                src={p.info.icon}
                alt={p.info.name}
              />
            </ListItemIcon>
            <ListItemText primary={p.info.name} />
          </ListItemButton>
        </ListItem>
      )),
    [ethereumProviders]
  );

  return (
    <Container maxWidth="sm">
      {!loginContext.loading && loginContext.value && (
        <EthereumLoginProvider context={loginContext.value}>
          <Outlet />
        </EthereumLoginProvider>
      )}

      <PagePaper>
        <Typography variant="h3">Sign in with Ethereum</Typography>
        <Stack
          spacing={2}
          sx={{ marginTop: 2 }}
        >
          <List
            subheader={<ListSubheader>Wallet Providers</ListSubheader>}
            sx={{
              flex: "1",
              overflow: "auto",
            }}
          >
            {ethereumProvidersElements.length > 0 ? (
              ethereumProvidersElements
            ) : (
              <ListItem>
                <ListItemText primary="No wallet providers found" />
              </ListItem>
            )}
          </List>
          <Divider flexItem={true} />
          {ethereumProvidersElements.length <= 0 && (
            <Button
              component={Link}
              to={"https://metamask.io/download/"}
              target="_blank"
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
            >
              Get MetaMask
            </Button>
          )}
          <Button
            component={Link}
            to={"/login"}
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
          >
            Sign in with Password
          </Button>
        </Stack>
      </PagePaper>
    </Container>
  );
};
