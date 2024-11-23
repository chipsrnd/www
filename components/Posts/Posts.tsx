"use client";

import { useState, useEffect } from "react";
import { Display } from "./Display";
import { createClient } from "@supabase/supabase-js";

// const supabaseURL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) ?? "";
// const supabaseKEY =
//   (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) ?? "";

// const supabase = createClient(supabaseURL, supabaseKEY);

type BBody = { title: string; link: string; file: string | null };

type Post = {
  type: string;
  bbody: BBody;
  date: string;
};

type eventsProps = {
  id: number;
  type: string;
  title: string;
  date: string;
  link: string;
  file: string | null;
};

export const Posts = ({ supa }: { supa: any }) => {
  const [news, setNews] = useState<Array<Post>>([]);

  const fetch = async () => {
    let { data } = await supa
      .from("newsInfo")
      .select("*")
      .order("date", { ascending: false });
    const converted = data?.map((item: eventsProps) => {
      return {
        type: item.type,
        bbody: {
          title: item.title,
          link: item.link,
          file: item.file,
        },
        date: item.date,
      };
    });
    setNews(converted ?? []);
    return converted;
  };

  useEffect(() => {
    fetch()
      // .then((res) => console.log(res))
      .catch((err) => console.log("DB ACCESS ERROR!!! \n", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (news != null) {
    return <Display news={news} />;
  } else {
    return null;
  }
};
