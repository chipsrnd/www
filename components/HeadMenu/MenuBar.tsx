"use client";

import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Divider,
  Drawer,
  ScrollArea,
  Collapse,
  rem,
  // UnstyledButton,
  Box,
  // Text,
  // Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./MenuBar.module.css";
import Image from "next/image";
import Logo from "../../public/logo.png";

type Links = {
  link: string;
  label: string;
  links?: Array<Link>;
};

type Link = {
  link: string;
  label: string;
};

const links = [
  { link: "/", label: "Events" },
  { link: "/", label: "News & Insights" },
  { link: "/", label: "R&D Funding" },
  { link: "/about", label: "About US" },
  // {
  //   link: "#1",
  //   label: "Learn",
  //   links: [
  //     { link: "/", label: "Documentation" },
  //     { link: "/", label: "Resources" },
  //     { link: "/", label: "Community" },
  //     { link: "/", label: "Blog" },
  //   ],
  // },
];

export function MenuBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const items = links.map((link) => {
    // @ts-expect-error
    const menuItems = link.links?.map((item: Link) => (
      <Menu.Item key={item.label}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              // onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  const draw_items = links.map((link) => {
    // @ts-expect-error
    const menuItems = link.links?.map((item: Link) => (
      <div className={classes.subLink} key={item.label}>
        <a href={item.link} className={classes.link}>
          {item.label}
        </a>
      </div>
    ));

    if (menuItems) {
      return (
        <div key={link.label}>
          <div onClick={toggleLinks} className={classes.link}>
            <Center inline>
              <Box component="span" mr={5}>
                {link.label}
              </Box>
              <IconChevronDown size="0.9rem" stroke={1.5} />
            </Center>
          </div>
          <Collapse in={linksOpened}>{menuItems}</Collapse>
        </div>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Image src={Logo} alt="" height={26} />
          {/* <MantineLogo size={28} /> */}
          <Group gap="xl" visibleFrom="sm">
            {items}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            size="md"
            hiddenFrom="sm"
          />
        </div>
      </Container>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Chips R&D"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {draw_items}
          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </header>
  );
}
