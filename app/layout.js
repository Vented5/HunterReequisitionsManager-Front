import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "../context/Context";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const inter = Inter({ subsets: ["latin"] });//Default font stile

export const metadata = {
  title: "Hunter Requisitions Manager",
  description: "manage yout requisitions fast and secure",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body>
        <ContextProvider>
            <NavBar/>
            <div className="flex">
              <SideBar/>
                  {children}
            </div>
        </ContextProvider>
      </body>
    </html>
  );
}
