import { AppProps } from "next/app";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout/Layout";
import Head from "next/head";
import { SWRConfig } from "swr";
import { Toaster } from "react-hot-toast";
import { fetcher } from "../utils/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ランチックス</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/image/favicon.png" />
        <link
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Layout>
        {/* useSWRのグローバル設定 fetcher関数を共通化 */}
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              success: {
                style: {
                  background: "#f6f0ea",
                  color: "#622d18",
                },
              },
              error: {
                style: {
                  background: "#F9C1CF",
                  color: "#622d18",
                },
              },
            }}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}

export default MyApp;
