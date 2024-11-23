"use client";

import classes from "./Events.module.css";

// import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Center,
  Container,
  Grid,
  Indicator,
  Title,
  Box,
  LoadingOverlay,
  Group,
  Button,
} from "@mantine/core";
import { DatePicker, DatePickerProps, DateValue } from "@mantine/dates";
import { Carousel, Embla } from "@mantine/carousel";

import { EventCard } from "./EventCard";
import { IconChevronsUpLeft } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

interface EventPros {
  id: number;
  title: string;
  description: string;
  startDate: string;
  duration: number;
  img: string;
  link: string;
}

interface EvenCvrtPros {
  title: string;
  description: string;
  days: string[];
  dayStr: string;
  year: number;
  month: number;
  link: string;
  img: string;
}

var dday: any = [];
var dis = new Date();
// var monthly: any = [];

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

export function Events({ supa }: { supa: any }) {
  const [value, setValue] = useState<Date | null>(null);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [ready, SetReady] = useState(false);
  const [events, setEvents] = useState<Array<EvenCvrtPros>>([]);
  const [monthly, setMonthly] = useState<Array<EvenCvrtPros>>([]);

  const fetch = async () => {
    let { data } = await supa.from("eventsInfo").select();
    // .eq("startDate", "2024-10-15");
    const converted = data?.map((item: EventPros) => {
      const pDay = new Date();
      pDay.setFullYear(Number(item.startDate.slice(0, 4)));
      pDay.setMonth(Number(item.startDate.slice(5, 7)) - 1);
      pDay.setDate(Number(item.startDate.slice(8)));

      let eDays = [];
      for (let i = 0; i < item.duration; i++) {
        pDay.setDate(pDay.getDate() + i);
        eDays.push(pDay.toLocaleDateString("en-CA"));
      }

      let dayStr = "";
      if (item.duration == 1) {
        dayStr = eDays[0].slice(8);
      } else {
        dayStr = eDays[0].slice(8) + "-" + eDays[eDays.length - 1].slice(8);
      }
      return {
        title: item.title,
        description: item.description,
        days: eDays,
        dayStr: dayStr + ", " + monthChar[pDay.getMonth()],
        year: Number(item.startDate.slice(0, 4)),
        month: Number(item.startDate.slice(5, 7)),
        link: item.link,
        img: item.img,
      };
    });

    setEvents(converted ?? []);
    return converted;
  };

  useEffect(() => {
    fetch()
      // .then((res) => console.log(res))
      .catch((err) => console.log("DB ACCESS ERROR!!! \n", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onMonthChange(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const onMonthChange = (date: Date) => {
    dis = date;
    const res = events.map((item) => {
      if (item.month == dis.getMonth() + 1) {
        return {
          days: item.days.map((i) => Number(i.slice(8))),
          card: item,
        };
      } else {
        return null;
      }
    });

    dday = res
      .filter((e) => e !== null)
      .map((i) => i.days)
      .flat(Infinity);
    setMonthly(
      res
        .filter((e) => e !== null)
        .map((i) => i.card)
        .sort(function (a, b) {
          var nameA = a.dayStr.toUpperCase(); // ignore upper and lowercase
          var nameB = b.dayStr.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
    );

    if (ready == false) SetReady(true);
  };

  const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    const day = date.getDate();
    return (
      <Indicator
        size={6}
        color="red"
        offset={-5}
        disabled={
          !(dis.getMonth() == date.getMonth() ? dday?.includes(day) : false)
        }
      >
        <div>{day}</div>
      </Indicator>
    );
  };

  const gotoSlide = (day: DateValue) => {
    setValue(day);
    if (day == null) return;

    const tempStr = day.toLocaleDateString("en-CA");
    const indx = monthly
      .map((i, ix) => {
        if (i.days.includes(tempStr)) return ix;
      })
      .filter((i) => i !== undefined);

    if (indx !== null) {
      embla?.scrollTo(indx[0]);
    }
  };

  return (
    <Container size={1300}>
      {ready ? (
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
              {/* {evt_list.map((item) => { */}
              {monthly.map((item: EvenCvrtPros) => {
                return (
                  <Carousel.Slide key={item.title}>
                    <EventCard
                      date={item.dayStr}
                      description={item.description}
                      linkUrl={item.link}
                      imgUrl={item.img}
                    />
                  </Carousel.Slide>
                );
              })}
            </Carousel>
            {/* {value?.getDate()} */}
          </Grid.Col>
          <Grid.Col span={{ base: 1, md: 0.7 }}></Grid.Col>
        </Grid>
      ) : null}
    </Container>
  );
}
