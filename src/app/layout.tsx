import type { Metadata } from "next";

import AppNavbar from "@/components/app-navbar";
import Providers from "@/components/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Starter",
  description: "Base starter template for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Not having suppressHydrationWarning on the <html> will create warnings because next-themes updates that element.
    // This property only applies one level deep, so it won't block hydration warnings on other elements.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body className="h-screen w-screen overscroll-none">
        <Providers>
          <AppNavbar />
          <main className="flex-grow bg-[url(/light-bg.svg)] bg-cover bg-fixed bg-center dark:bg-[url(/dark-bg.svg)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
