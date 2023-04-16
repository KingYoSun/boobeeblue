import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import nextI18NextConfig from "../../next-i18next.config";
import Layout from "@/components/Layout/Layout";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function App({ Component, pageProps }: AppProps) {
  const lightTheme = createTheme({
    type: "light",
  });

  const darkTheme = createTheme({
    type: "dark",
  });

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Head>
          <title>boobee.blue</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="unofficial bluesky client" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
