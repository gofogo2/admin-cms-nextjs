import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PageContextProvider } from "../contexts/PageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageContextProvider>
      <Component {...pageProps} />{" "}
    </PageContextProvider>
  );
}

export default MyApp;
