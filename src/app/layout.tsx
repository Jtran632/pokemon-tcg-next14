import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import SessionWrapper from "./components/sessionProvider";
import { TRPCReactProvider } from "./_trpc/client";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon TCG Viewer",
  description: "View all pokemon card sets",
  // icons: {
  //   icon: "/next.svg",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <TRPCReactProvider>
            <NavBar />
            {children}
          </TRPCReactProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
