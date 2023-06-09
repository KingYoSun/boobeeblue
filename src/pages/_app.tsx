import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import nextI18NextConfig from "../../next-i18next.config";
import Layout from "@/components/Layout/Layout";
import { createTheme, NextUIProvider, useTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { IconContext } from "react-icons";
import { ProSidebarProvider } from "react-pro-sidebar";
import BskyAgentsContextProvider from "@/contexts/BskyAgents";

function App({ Component, pageProps }: AppProps) {
  const lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {
        background: "#fff",
        text: "#1d1d1d",
      },
    },
  });

  const darkTheme = createTheme({
    type: "dark",
    theme: {
      colors: {
        background: "#1d1d1d",
        text: "#fff",
      },
    },
  });

  const { theme } = useTheme();

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
        <IconContext.Provider
          value={{
            color: theme?.colors.text.value,
            size: theme?.fontSizes["2xl"].value,
          }}
        >
          <ProSidebarProvider>
            <BskyAgentsContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </BskyAgentsContextProvider>
          </ProSidebarProvider>
        </IconContext.Provider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
