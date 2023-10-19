import { Metadata } from "next";
import React from "react";

import "styles/tailwind.css";
export const metadata: Metadata = {
  title: "WordBook - Internet redefined",
  description: "Wordpress and Facebook merged - the all new social media for 2023",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
