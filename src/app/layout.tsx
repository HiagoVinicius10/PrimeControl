import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";



export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerenciamento.",
  description: "Gerencia seus clientes e atendimentos de forma fácil!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
      <AuthProvider>
        <ModalProvider>
          <Header />
          {children}
        </ModalProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
