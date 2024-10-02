import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Nav";
import Provider from "@/components/Provider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Propmtopia",
  description: "AI powered prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}

          </main>

        </Provider>

      </body>
    </html>
  );
}
