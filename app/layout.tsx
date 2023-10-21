import { Metadata } from "next";
import Head from "next/head";
import React from "react";

import "styles/tailwind.css";
export const metadata: Metadata = {
  title: "WordBook - Internet redefined",
  description: "Wordpress and Facebook merged - the all new social media for 2023",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
