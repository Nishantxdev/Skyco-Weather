import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Skyco Weather — Weather Made Simple.",
  description: "Skyco Weather — Weather Made Simple Skyco Weather is your trusted destination for accurate, real-time weather updates and forecasts. Easily search for cities around the world to check current temperature, weather conditions, humidity, wind speed, and upcoming forecasts. With a clean, modern, and user-friendly interface, Skyco Weather helps you stay informed about changing weather conditions and plan your day with confidence.Stay informed. Stay prepared. Stay ahead with Skyco Weather.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

       <head>
        <link rel="icon" href="/favicon2.png" />
      </head>
      <body className=" body min-h-screen flex flex-col ">
        {children}
        </body>
    </html>
  );
}
