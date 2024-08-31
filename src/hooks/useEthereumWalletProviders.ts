import { useSyncExternalStore } from "react";
import { EIP1193ProviderEventType } from "../definitions/ethereumConstants";
import type {
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
} from "../types/ethereumProvider";

const ethereumWalletProviders = new Map<string, EIP6963ProviderDetail>();
let ethereumWalletProvidersSnapshot: EIP6963ProviderDetail[] = [];

const ethereumWalletProviderStore = {
  getSnapshot: () => ethereumWalletProvidersSnapshot,

  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (ethereumWalletProviders.has(event.detail.info.uuid)) {
        return;
      }

      event.detail.provider.on(EIP1193ProviderEventType.Message, event => {
        console.log(event);
      });

      ethereumWalletProviders.set(event.detail.info.uuid, event.detail);
      ethereumWalletProvidersSnapshot = Array.from(ethereumWalletProviders.values());
      callback();
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => {
      window.removeEventListener("eip6963:announceProvider", onAnnouncement);
    };
  },
};

export const useEthereumWalletProviders = () =>
  useSyncExternalStore(
    ethereumWalletProviderStore.subscribe,
    ethereumWalletProviderStore.getSnapshot
  );
