"use client";

import classes from "./Events.module.css";

// import dayjs from "dayjs";
import { useState } from "react";
import { Center, Container, Grid, Indicator, Title } from "@mantine/core";
import { DatePicker, DatePickerProps, DateValue } from "@mantine/dates";
import { Carousel, Embla } from "@mantine/carousel";

import { EventCard } from "./EventCard";

export function Events() {
  const [value, setValue] = useState<Date | null>(null);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const monthChar = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const evt_list = [
    {
      day: 6,
      month: 11,
      title: "학회11111",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      link: "",
    },
    {
      day: 13,
      month: 11,
      title: "학회11111",
      description: "학회설명",
      link: "",
    },
    {
      day: 20,
      month: 11,
      title: "학회11111",
      description: "학회설명",
      link: "",
    },
    {
      day: 21,
      month: 11,
      title: "학회11111",
      description: "학회설명",
      link: "",
    },
    {
      day: 25,
      month: 11,
      title: "학회11111",
      description: "학회설명",
      link: "",
    },
    {
      day: 29,
      month: 11,
      title: "학회11111",
      description: "학회설명",
      link: "",
    },
  ];

  const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    const day = date.getDate();
    return (
      <Indicator
        size={6}
        color="red"
        offset={-5}
        disabled={!evt_list.map((item) => item.day).includes(day)}
      >
        <div>{day}</div>
      </Indicator>
    );
  };

  const gotoSlide = (day: DateValue) => {
    setValue(day);

    if (day == null) return;

    const indx = evt_list.map((item) => item.day).indexOf(day.getDate());
    if (indx >= 0) {
      // console.log(indx);
      embla?.scrollTo(indx);
    }
  };

  return (
    <Container size={1300}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 12 }}>
          <Title style={{ paddingBottom: "1rem", paddingTop: "1rem" }}>
            Events
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 0, md: 0.7 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Center>
            <DatePicker
              allowDeselect
              value={value}
              onChange={gotoSlide}
              size="lg"
              highlightToday={true}
              firstDayOfWeek={0}
              renderDay={dayRenderer}
            />
          </Center>
        </Grid.Col>
        <Grid.Col span={{ base: 1, md: 0.6 }}></Grid.Col>
        <Grid.Col span={{ base: 10, md: 7 }}>
          <Carousel
            withIndicators
            height={300}
            dragFree
            slideGap={{ base: 0, sm: "md" }}
            // align="end"
            slideSize={{ base: "100%", sm: "50%", md: "35%" }}
            controlsOffset="lg"
            slidesToScroll="auto"
            classNames={classes}
            getEmblaApi={setEmbla}
          >
            {evt_list.map((item) => {
              return (
                <Carousel.Slide key={item.day}>
                  <EventCard
                    date={item.day + " " + monthChar[item.month - 1]}
                    description={item.description}
                    linkUrl={item.link}
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
          {/* {value?.getDate()} */}
        </Grid.Col>
        <Grid.Col span={{ base: 1, md: 0.7 }}></Grid.Col>
      </Grid>
    </Container>
  );
}
