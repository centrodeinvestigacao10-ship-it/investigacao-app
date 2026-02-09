import "../styles/globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata = {
  title: "Investigação - Controle",
  description: "App para controle rápido de investigação"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
