import ReduxProvider from "@/components/porvider";
import SpinnerClient from "@/components/spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ReduxProvider>
          <SpinnerClient />
          <>{children}</>
        </ReduxProvider>
      </body>
    </html>
  );
}
