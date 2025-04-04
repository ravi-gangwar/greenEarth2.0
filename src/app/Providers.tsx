"use client";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "@/store/store";
import { Provider as RWBProver } from "react-wrap-balancer";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RWBProver>{children}</RWBProver>
        <Toaster />
      </PersistGate>
    </ReduxProvider>
  );
}
