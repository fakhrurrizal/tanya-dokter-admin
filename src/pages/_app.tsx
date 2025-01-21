import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type ReactElement, type ReactNode } from "react";

import "@/styles/globals.css";
import "../config/axios.config";

import ErrorBoundary from "@/components/error-boundary";
import { useGetTheme } from "@/styles/theme";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/id";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

dayjs.extend(localeData);

dayjs.extend(timezone);

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, retryDelay: 1000 * 5 } },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const theme = useGetTheme();

  const getLayout = Component.getLayout ?? ((page) => page);

  const components = getLayout(<Component {...pageProps} />);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <ErrorBoundary>
            <ToastContainer
              hideProgressBar
              position="top-center"
              autoClose={1700}
              pauseOnHover
              closeButton={false}

              // limit={5}
            />
            <Box
              component="main"
              sx={({ isDarkMode }) => ({
                "*::-webkit-scrollbar": {
                  width: "0.5em",
                },

                "*::-webkit-scrollbar-thumb": {
                  backgroundColor: isDarkMode ? "white" : "#e5e7eb",
                  borderRadius: "0.25em",
                },
              })}
            >
              <NextNProgress color={theme.palette.primary.main} height={3} />

              {components}
            </Box>
          </ErrorBoundary>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
export default App;
