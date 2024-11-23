import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

import PopUp from "./popup.svg";
import classes from "./EventCard.module.css";

interface EventCardProps {
  date: string;
  description: string;
  linkUrl: string;
  imgUrl: string;
}

export function EventCard({
  date,
  description,
  linkUrl,
  imgUrl,
}: EventCardProps) {
  // console.log(imgUrl);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
    >
      <Card.Section>
        <span className={classes.cardBadge}>{date}</span>
        <Image src={imgUrl} height={120} alt="" />
      </Card.Section>

      <Group>
        <Text
          size="sm"
          c="dimmed"
          lineClamp={5}
          style={{ paddingTop: "0.8rem" }}
        >
          {description}
        </Text>
        <a href={linkUrl} target="_blank">
          <PopUp
            className={classes.cardLink}
            height="12"
            width="12"
            fill="#a7acb0"
          />
        </a>
      </Group>
    </Card>
  );
}
