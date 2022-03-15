import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PageContextProvider } from "../contexts/PageContext";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageContextProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json()),
        }}
      >
        <Component {...pageProps} />{" "}
      </SWRConfig>
    </PageContextProvider>
  );
}

export default MyApp;
