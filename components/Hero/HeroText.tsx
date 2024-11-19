import { Title, Text, Button, Container, Space } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./HeroText.module.css";

export function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 20 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 60 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 200 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          (한-미) 반도체{" "}
          <Text component="span" className={classes.highlight} inherit>
            R&D 협력센터
          </Text>
        </Title>
        <Space h="xl" />
        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            반도체 분야 연구자•엔지니어들의 협력 플랫폼으로서 대면•비대면
            네트워킹 등을 통해 다양한 기회(연구자 홍보, 인력교류, 연구협력,
            커리어 개발 등)를 발굴하고 지원함으로써 반도체 종사자 생태계를
            구축합니다
          </Text>
          <Text
            size="lg"
            c="dimmed"
            className={classes.description}
            mt={"1.5rem"}
          >
            Serves as a platform for sharing the latest research, exchanging
            ideas, fostering collaboration and addressing challenges.
          </Text>
        </Container>

        <Space h="xl" />

        {/* <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
          >
            Linkedin
          </Button>
          <Button className={classes.control} size="lg">
            Join
          </Button>
        </div> */}
      </div>
    </Container>
  );
}
