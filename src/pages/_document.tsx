import { DEFAULT_LANG } from "@utils/constants";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ReactElement } from "react";
import { LangCode } from "../model";

export default class MyDocument extends Document<{ lang: LangCode }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { lang: LangCode }> {
    const { query } = ctx;

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      lang: (query?.lang as LangCode) ?? DEFAULT_LANG,
    };
  }

  render(): ReactElement {
    return (
      <Html lang={this.props.lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
