"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "react-hot-toast";
import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <SessionProvider>{children}</SessionProvider>
        </ReduxProvider>
      </QueryClientProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
    </NextUIProvider>
  );
}
