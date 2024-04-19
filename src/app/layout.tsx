import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Provider from "./_trpc/Provider";
import SessionWrapper from "./components/sessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon TCG Viewer",
  description: "View all pokemon card sets",
  icons: {
    icon: "/next.svg",
  },
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
          <Provider>
            <NavBar />
            {children}
          </Provider>
        </SessionWrapper>
      </body>
    </html>
  );
}
