import { Fuzzy_Bubbles, Roboto, Saira } from "next/font/google"; // TODO: Replace with client fonts
import "./styles/globals.css";

// TODO: Add custom fonts here
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // Specify weights you need
});

const fuzzyBubbles = Fuzzy_Bubbles({
  variable: "--font-fuzzy-bubbles",
  subsets: ["latin"],
  weight: ["400", "700"], // Specify weights you need
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // Specify weights you need
});

export const metadata = {
  metadataBase: new URL("https://ericlemiere.com"), // TODO: update to your domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Adobe Fonts */}
        {/* TODO: Update following line when setting up project w/ correct TypeKit Link(s) for fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/kmt7hcd.css" />
      </head>
      <body
        className={`${saira.variable} ${fuzzyBubbles.variable} ${roboto.variable} antialiased h-full`}
      >
        <div
          id="OPEN-THIS-DIV"
          dangerouslySetInnerHTML={{
            __html: `
<!--

╔═══════════════════╗
║                   ║
║   ███████╗        ║
║   ██╔═══██╗       ║
║   ███████╔╝       ║
║   ██╔═══██╗       ║
║   ██║   ██║       ║
║   ╚═╝   ╚═╝ █████ ║
║                   ║
╚═══════════════════╝

Site built by 
https://ericlemiere.com

-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
