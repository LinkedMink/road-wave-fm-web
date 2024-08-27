/* eslint-disable @typescript-eslint/no-misused-promises */
import {} from "@linkedmink/eip-4361-parser";
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
import { FunctionComponent, useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useEthereumWalletProviders } from "../../hooks/useEthereumWalletProviders";
import { AlertProvider } from "../../providers/AlertProvider";
import { EthereumBrowserProvider } from "../../providers/EthereumBrowserProvider";
import { EIP6963ProviderDetail } from "../../types/ethereum";
import { PagePaper } from "../styled/PagePaper";

export const LoginWithEthereumPage: FunctionComponent = () => {
  const ethereumProviders = useEthereumWalletProviders();
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail | undefined>();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    setSelectedWallet(providerWithInfo);

    const accounts = await providerWithInfo.provider.request({ method: "eth_requestAccounts" });
    console.log(accounts);
  };

  const ethereumProvidersElements = useMemo(
    () =>
      Array.from(ethereumProviders.values()).map(p => (
        <ListItem key={p.info.uuid}>
          {" "}
          <ListItemButton onClick={() => handleConnect(p)}>
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
    <AlertProvider>
      <Container maxWidth="sm">
        {selectedWallet && (
          <EthereumBrowserProvider detail={selectedWallet}>
            <Outlet />
          </EthereumBrowserProvider>
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
                Get Metamask
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
    </AlertProvider>
  );
};
