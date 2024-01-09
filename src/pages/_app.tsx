import { FunctionComponent } from "react";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
