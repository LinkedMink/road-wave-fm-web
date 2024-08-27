import { useSyncExternalStore } from "react";
import { EIP6963AnnounceProviderEvent, EIP6963ProviderDetail } from "../types/ethereum";

const ethereumWalletProviders = new Map<string, EIP6963ProviderDetail>();

const ethereumWalletProviderStore = {
  getSnapshot: () => ethereumWalletProviders,

  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (ethereumWalletProviders.has(event.detail.info.uuid)) {
        return;
      }

      ethereumWalletProviders.set(event.detail.info.uuid, event.detail);
      callback();
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => window.removeEventListener("eip6963:announceProvider", onAnnouncement);
  },
};

export const useEthereumWalletProviders = () =>
  useSyncExternalStore(
    ethereumWalletProviderStore.subscribe,
    ethereumWalletProviderStore.getSnapshot
  );
