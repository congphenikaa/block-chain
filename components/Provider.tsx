"use client";

import { ReactNode } from "react";
import { IotaClientProvider, WalletProvider } from "@iota/dapp-kit";
import { getFullnodeUrl } from "@iota/iota-sdk/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@iota/dapp-kit/dist/index.css";

const queryClient = new QueryClient();

const networks = {
  mainnet: { url: getFullnodeUrl("mainnet") },
  devnet: { url: getFullnodeUrl("devnet") },
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider autoConnect>
          {children}
        </WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
}
