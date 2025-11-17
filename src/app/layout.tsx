import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationMap } from "@/components/LocationMap";
import RootClient from "./RootClient";

export const metadata = {
  title: "Vaulta Storage",
  description: "Intelligent and scalable storage solutions",
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <RootClient>
          {children}
        </RootClient>
      </body>
    </html>
  );
}
