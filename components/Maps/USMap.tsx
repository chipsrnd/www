"use client";

import React, { useEffect, useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import {
  Button,
  Container,
  Text,
  Grid,
  Center,
  Flex,
  Group,
} from "@mantine/core";
import classes from "./USMap.module.css";

// import { createClient } from "@supabase/supabase-js";
// const supabaseURL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string) ?? "";
// const supabaseKEY =
//   (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) ?? "";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface partnerInfo {
  id: number;
  offsetX: number;
  offsetY: number;
  name: string;
  latitude: number;
  longitude: number;
  type: number | null;
}

// const supabase = createClient(supabaseURL, supabaseKEY);

export const USMap = ({ supa }: { supa: any }) => {
  const [markers, setMarkers] = useState<Array<any>>([]);

  const fetch = async () => {
    let { data } = await supa.from("partnerInfo").select("*");
    const converted = data?.map((item: partnerInfo) => {
      return {
        id: item.id,
        offsetX: item.offsetX,
        offsetY: item.offsetY,
        name: item.name,
        coordinates: [item.latitude, item.longitude],
      };
    });
    setMarkers(converted ?? []);
    return converted;
  };

  useEffect(() => {
    fetch()
      // .then((res) => console.log(res))
      .catch((err) => console.log("DB ACCESS ERROR!!! \n", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container size={1300}>
      <Grid>
        {/* <Grid.Col span={{ base: 12, md: 3 }}>
          <Flex h={"100%"} align="center" direction="column" justify="center">
            <Button>Join (Linkedin Group)</Button>
            <Text ta={"center"}>문의: chipsrnd (at) gmail.com</Text>
          </Flex>
        </Grid.Col> */}
        <Grid.Col span={{ base: 0.5, md: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 11.5, md: 10 }}>
          <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies, outline, borders }) => (
                <>
                  <Geography geography={outline} fill="#E9E3DA" />
                  <Geography geography={borders} fill="none" stroke="#FFF" />
                </>
              )}
            </Geographies>
            {markers?.map(({ offsetX, offsetY, name, coordinates }) => (
              <Marker
                key={name}
                coordinates={[coordinates[1], coordinates[0]]}
                id={name}
              >
                <circle
                  r={8}
                  fill="#E42A1D"
                  stroke="#fff"
                  strokeWidth={1}
                  className={classes.marker}
                />
                <text
                  textAnchor="middle"
                  y={offsetY}
                  x={offsetX}
                  className={classes.markerText}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </Grid.Col>
        <Grid.Col span={{ base: 0.5, md: 1 }}></Grid.Col>
      </Grid>
    </Container>
  );
};
