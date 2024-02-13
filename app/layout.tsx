import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation"; // Import from next/navigation
import "../styles/globals.css";
import LeftNavBar from "./components/leftnavbar";
import Header from "./components/header";
import React, { useState } from "react";
import { PageTitleProvider } from "./pagetitlecontext";
const inter = Inter({ subsets: ["latin"] });

import ThemeProvider from "./theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <LeftNavBar />
          <div className="rightsection">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
