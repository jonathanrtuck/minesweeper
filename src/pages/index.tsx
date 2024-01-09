import { FunctionComponent } from "react";

import Head from "next/head";

import { Game } from "@/components/Game";

const Home: FunctionComponent = () => (
  <>
    <Head>
      <title>minesweeper</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Game />
  </>
);

export default Home;
