import type React from "react";
import "./globals.css";
import "./pdf-styles.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Money Brief",
  description:
    "Assess your investor profile and get personalized recommendations",
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px] opacity-90 -z-10"
          style={{
            backgroundImage:
              'url("/the-money-brief/images/finance-background.png")',
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
