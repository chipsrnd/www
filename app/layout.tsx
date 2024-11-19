import "@mantine/core/styles.css";

import React from "react";
import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "ETRI CHIPS-RND",
  description: "...!",
};

import { MenuBar } from "../components/HeadMenu/MenuBar";
import { HeroText } from "../components/Hero/HeroText";
import { Events } from "../components/Events/Events";
import { Posts } from "../components/Posts/Posts";
import { FeaturesCards } from "../components/FeaturesCards/FeatureCards";
import { USMap } from "../components/Maps/USMap";

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
          <HeroText />
          {/* <FeaturesCards /> */}
          <USMap />
          <Events />
          <div style={{ height: "50px" }}></div>
          <Posts />
          {children}
          <div style={{ height: "50px" }}></div>
        </MantineProvider>
      </body>
    </html>
  );
}
