import { AppProps } from "next/app";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ランチックス</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/image/favicon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
