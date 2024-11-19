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

// interface GeographiesChildrenArgument {
//   geographies: any[];
//   outline: any;
//   borders: any;
//   path: any;
//   projection: any;
// }

const markers = [
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Washington",
    coordinates: [47.6571, -122.3],
  },
  {
    offsetX: 60,
    offsetY: -20,
    name: "University of California, Davis",
    coordinates: [38.5384, -121.7617],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Nevada, Reno",
    coordinates: [39.5439, -119.814],
  },
  {
    offsetX: 80,
    offsetY: -20,
    name: "San Francisco State University",
    coordinates: [37.7242, -122.4798],
  },
  {
    offsetX: 80,
    offsetY: 20,
    name: "San José State University",
    // coordinates: [37.3353, -121.881],
    coordinates: [36.9353, -121.881],
  },
  {
    offsetX: 60,
    offsetY: -20,
    name: "Santa Clara University",
    // coordinates: [37.3491, -121.9367],
    coordinates: [37.3491, -121.5367],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "Stanford University",
    coordinates: [37.4278, -122.17],
  },
  {
    offsetX: 80,
    offsetY: -10,
    name: "University of California, Irvine",
    coordinates: [33.6425, -117.8416],
  },
  {
    offsetX: 80,
    offsetY: -10,
    name: "University of California, Santa Barbara",
    coordinates: [34.4141, -119.8489],
  },
  {
    offsetX: 115,
    offsetY: 0,
    name: "University of California San Diego",
    coordinates: [32.8819, -117.2344],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "Texas A&M University",
    coordinates: [30.6067, -96.3568],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of North Texas",
    // coordinates: [33.2077, -97.1525],
    coordinates: [32.7077, -97.1525],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Notre Dame",
    coordinates: [33.2143, -97.1535],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Texas at Dallas",
    coordinates: [32.9859, -96.7502],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "Michigan Technological University",
    coordinates: [47.1165, -88.5438],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Michigan",
    coordinates: [42.4292, -83.7701],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "Ohio State University",
    coordinates: [40.0061, -83.0282],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Illinois Urbana-Champaign",
    coordinates: [40.102, -88.2271],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "Cornell Tech",
    coordinates: [40.7557, -73.9562],
  },
  {
    offsetX: 30,
    offsetY: -10,
    name: "Pennsylvania State University",
    coordinates: [40.7982, -77.8599],
  },
  {
    offsetX: 30,
    offsetY: -15,
    name: "Purdue University",
    coordinates: [40.4238, -86.9211],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "Rice University",
    coordinates: [29.717, -95.4035],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "Binghamton University",
    coordinates: [42.1684, -75.965],
  },
  {
    offsetX: 0,
    offsetY: -20,
    name: "Georgia Institute of Technology",
    coordinates: [33.7757, -84.3962],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Central Florida",
    coordinates: [28.6027, -81.1999],
  },
  {
    offsetX: 30,
    offsetY: -20,
    name: "University of Florida",
    coordinates: [29.6467, -82.3533],
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
            offsetX: 30,
            {markers.map(({ name, coordinates, offsetY, offsetX }) => (
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
      </Grid>
    </Container>
  );
};
