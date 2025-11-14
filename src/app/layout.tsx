import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationMap } from "@/components/LocationMap";
import RootClient from "./RootClient";

export const metadata = {
  title: "Vaulta Storage",
  description: "Intelligent and scalable storage solutions",
  icons: {
    icon: "/vaultalogo.webp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <RootClient>
          {children}
        </RootClient>
      </body>
    </html>
  );
}
