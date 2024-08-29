import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import { FunctionComponent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useEthereumWalletProviders } from "../../hooks/useEthereumWalletProviders";
import { EIP6963ProviderDetail } from "../../types/ethereumProvider";

export interface EthereumProviderListOwnProps {
  selectedWallet: EIP6963ProviderDetail | null;
  onSelectedWallet: (wallet: EIP6963ProviderDetail) => void;
}

export const EthereumProviderList: FunctionComponent<EthereumProviderListOwnProps> = props => {
  const ethereumProviders = useEthereumWalletProviders();

  const ethereumProvidersElements = useMemo(
    () =>
      ethereumProviders.map(p => (
        <ListItem
          key={p.info.uuid}
          disablePadding
        >
          <ListItemButton
            selected={props.selectedWallet === p}
            divider={true}
            onClick={() => props.onSelectedWallet(p)}
          >
            <ListItemAvatar>
              <Avatar
                alt={p.info.name}
                src={p.info.icon}
              />
            </ListItemAvatar>
            <ListItemText primary={p.info.name} />
          </ListItemButton>
        </ListItem>
      )),
    [ethereumProviders]
  );

  return (
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
  );
};
