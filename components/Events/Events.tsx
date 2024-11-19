"use client";

import classes from "./Events.module.css";

// import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Center, Container, Grid, Indicator, Title } from "@mantine/core";
import { DatePicker, DatePickerProps, DateValue } from "@mantine/dates";
import { Carousel, Embla } from "@mantine/carousel";

import { EventCard } from "./EventCard";
import { tree } from "next/dist/build/templates/app-page";

export function Events() {
  const [value, setValue] = useState<Date | null>(null);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [display, setDisplay] = useState<Date>(new Date());
  const [dayList, setDayList] = useState<any[] | null>();

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
      day: 15,
      month: 11,
      year: 2024,
      title: "OCP Global Summit",
      description:
        "the premier event uniting the most forward-thinking minds in open IT Ecosystem development. The Summit presents a unique platform for our Community from around the globe to share their insights, foster partnerships and showcase cutting-edge advancements in open hardware and software",
      link: "",
    },
    {
      day: [18, 19],
      month: 11,
      year: 2024,
      title: "OCP Global Summit222",
      description:
        "the premier event uniting the most forward-thinking minds in open IT Ecosystem development. The Summit presents a unique platform for our Community from around the globe to share their insights, foster partnerships and showcase cutting-edge advancements in open hardware and software",
      link: "",
    },
  ];
  // DB에서 year, month는 쿼리로 필터링
  // 처음에는 현재 연도, 월도 지정

  useEffect(() => {
    const temp = evt_list.map((item) =>
      item.year == display.getFullYear() && item.month == display.getMonth() + 1
        ? item.day
        : null
    );
    setDayList(temp.flat(Infinity));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMonthChange = (date: Date) => {
    setDisplay(date);
    setDayList([date.getMonth(), 1, 2, 3]);
    // 지정된 달에 맞게 업데이트
  };

  const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    const day = date.getDate();
    return (
      <Indicator
        size={6}
        color="red"
        offset={-5}
        // disabled={!evt_list.map((item) => item.day).includes(day)}
        disabled={
          !(display.getMonth() == date.getMonth()
            ? dayList?.includes(day)
            : false)
        }
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
              onNextMonth={onMonthChange}
              onPreviousMonth={onMonthChange}
              onMonthSelect={onMonthChange}
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
                <Carousel.Slide key={item.title}>
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
