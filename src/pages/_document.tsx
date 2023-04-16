import React from "react";
import Document, {
  Html,
  Main,
  Head,
  NextScript,
  DocumentContext,
} from "next/document";
import { getServerTranslations } from "@/lib/i18n/getServerTranslation";
import nextI18NextConfig from "../../next-i18next.config";
import { CssBaseline } from "@nextui-org/react";

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
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {CssBaseline.flush()}
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
