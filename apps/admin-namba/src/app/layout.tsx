import ReduxProvider from "@/components/porvider";
import SpinnerClient from "@/components/spinner";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/LOGO_NAMBA.png" />
      </Head>
      <body>
        <ReduxProvider>
          <SpinnerClient />
          <>{children}</>
        </ReduxProvider>
      </body>
    </html>
  );
}
