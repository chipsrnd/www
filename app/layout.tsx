import "@mantine/core/styles.css";

import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "ETRI CHIPS-RND",
  description: "...!",
};

import { MenuBar } from "../components/HeadMenu/MenuBar";
import Home from "./page";

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <MenuBar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
