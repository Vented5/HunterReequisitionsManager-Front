import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "../context/Context";

import { login } from '../lib'


const inter = Inter({ subsets: ["latin"] });//Default font stile

export const metadata = {
  title: "Hunter Requisitions Manager",
  description: "manage yout requisitions fast and secure",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className="h-screen bg-background">
        <ContextProvider>
            {children}          
        </ContextProvider>
      </body>
    </html>
  );
}
