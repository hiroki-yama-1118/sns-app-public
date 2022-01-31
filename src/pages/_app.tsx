import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { Toaster } from "react-hot-toast";
import nprogress from "nprogress"; // NProgressインポート
import "nprogress/nprogress.css"; // バーのデフォルトスタイルのインポート
import "tailwindcss/tailwind.css";

import { Layout } from "../components/Layout/Layout";
import { fetcher } from "../utils/fetcher";


// バーの設定
//    showSpinner: バーと一緒にローディングスピナーを表示するかどうか
//    speed: バーが右端に到達し消えるまでの時間 (msec)
//    minimum: バーの開始地点
nprogress.configure({ showSpinner: true, speed: 400, minimum: 0.25 });

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser) {
    // バーの表示開始
    nprogress.start();
  }
  useEffect(() => {
    // バーの表示終了
    nprogress.done();
  });

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
          {/* 通知バーコンポーネント */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#f6f0ea",
                color: "#622d18",
              },
              error: {
                style: {
                  background: "#F9C1CF",
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
