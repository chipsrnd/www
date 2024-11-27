"use client";

import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "mantine-react-table/styles.css";

import { HeroText } from "../components/Hero/HeroText";
import { Events } from "../components/Events/Events";
import { Posts } from "../components/Posts/Posts";
import { FeaturesCards } from "../components/FeaturesCards/FeatureCards";
import { USMap } from "../components/Maps/USMap";

import { useEffect, useState } from "react";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseURL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) ?? "";
const supabaseKEY =
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) ?? "";

export default function Home() {
  const [supa, SetSupa] = useState<SupabaseClient>();

  useEffect(() => {
    SetSupa(createClient(supabaseURL, supabaseKEY));
    //   // console.log("HOME", supa);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeroText />
      {/* <FeaturesCards /> */}
      {supa ? (
        <>
          <USMap supa={supa} />
          <Events supa={supa} />
          <div style={{ height: "50px" }}></div>
          <Posts supa={supa} />
          <div style={{ height: "50px" }}></div>
        </>
      ) : null}
    </>
  );
}
