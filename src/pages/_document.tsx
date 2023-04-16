import React from "react";
import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { getServerTranslations } from "@/lib/i18n/getServerTranslation";
import { createStylesServer, ServerStyles } from "@mantine/next";
import { Head } from "next/document";
import nextI18NextConfig from "../../next-i18next.config";

const stylesServer = createStylesServer();

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      ...(await getServerTranslations(
        ctx.locale ?? "ja",
        ["common"],
        nextI18NextConfig
      )),
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
