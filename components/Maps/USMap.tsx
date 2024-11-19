"use client";

import React from "react";
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

// import allStates from "./allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// const markers = [
//   { markerOffset: -20, name: "Chicago", coordinates: [-87.6298, 41.8781] },
//   { markerOffset: -20, name: "Boston", coordinates: [-71.0589, 42.3601] },
//   { markerOffset: -20, name: "Tulsa", coordinates: [-95.9928, 36.154] },
//   { markerOffset: -20, name: "Baltimore", coordinates: [-76.6122, 39.2904] },
//   { markerOffset: -20, name: "Miami", coordinates: [-80.1918, 25.7617] },
//   {
//     markerOffset: 30,
//     name: "Washington, D.C.",
//     coordinates: [-77.0369, 38.9072],
//   },
//   { markerOffset: -20, name: "Los Angeles", coordinates: [-118.2426, 34.0549] },
// ];

const markers = [
  {
    markerOffset: -20,
    name: "University of Washington",
    coordinates: [47.6571, -122.3],
  },
  {
    markerOffset: -20,
    name: "University of California, Davis",
    coordinates: [38.5384, -121.7617],
  },
  {
    markerOffset: -20,
    name: "University of Nevada, Reno",
    coordinates: [39.5439, -119.814],
  },
  {
    markerOffset: -20,
    name: "San Francisco State University",
    coordinates: [37.7242, -122.4798],
  },
  {
    markerOffset: -20,
    name: "San José State University",
    coordinates: [37.3353, -121.881],
  },
  {
    markerOffset: -20,
    name: "Santa Clara University",
    coordinates: [37.3491, -121.9367],
  },
  {
    markerOffset: -20,
    name: "Stanford University",
    coordinates: [37.4278, -122.17],
  },
  {
    markerOffset: -20,
    name: "University of California, Irvine",
    coordinates: [33.6425, -117.8416],
  },
  {
    markerOffset: -20,
    name: "University of California, Santa Barbara",
    coordinates: [34.4141, -119.8489],
  },
  {
    markerOffset: -20,
    name: "University of California San Diego",
    coordinates: [32.8819, -117.2344],
  },
  {
    markerOffset: -20,
    name: "Texas A&M University",
    coordinates: [30.6067, -96.3568],
  },
  {
    markerOffset: -20,
    name: "University of North Texas",
    // coordinates: [33.2077, -97.1525],
    coordinates: [32.7077, -97.1525],
  },
  {
    markerOffset: -20,
    name: "University of Notre Dame",
    coordinates: [33.2143, -97.1535],
  },
  {
    markerOffset: -20,
    name: "University of Texas at Dallas",
    coordinates: [32.9859, -96.7502],
  },
  {
    markerOffset: -20,
    name: "Michigan Technological University",
    coordinates: [47.1165, -88.5438],
  },
  {
    markerOffset: -20,
    name: "University of Michigan",
    coordinates: [42.4292, -83.7701],
  },
  {
    markerOffset: -20,
    name: "Ohio State University",
    coordinates: [40.0061, -83.0282],
  },
  {
    markerOffset: -20,
    name: "University of Illinois Urbana-Champaign",
    coordinates: [40.102, -88.2271],
  },
  {
    markerOffset: -20,
    name: "Cornell Tech",
    coordinates: [40.7557, -73.9562],
  },
  {
    markerOffset: -20,
    name: "Pennsylvania State University",
    coordinates: [40.7982, -77.8599],
  },
  {
    markerOffset: -20,
    name: "Purdue University",
    coordinates: [40.4238, -86.9211],
  },
  {
    markerOffset: -20,
    name: "Rice University",
    coordinates: [29.717, -95.4035],
  },
  {
    markerOffset: -20,
    name: "Binghamton University ",
    coordinates: [42.1684, -75.965],
  },
];

export const USMap = () => {
  return (
    <Container size={1300}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Flex h={"100%"} align="center" direction="column" justify="center">
            <Button>Join (Linkedin Group)</Button>
            <Text ta={"center"}>문의: chipsrnd (at) gmail.com</Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8.5 }}>
          <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies, outline, borders }) => (
                <>
                  <Geography geography={outline} fill="#E9E3DA" />
                  <Geography geography={borders} fill="none" stroke="#FFF" />
                </>
              )}
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
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
                  y={markerOffset}
                  className={classes.markerText}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
