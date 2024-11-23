import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_TableOptions,
  type MRT_ColumnDef,
} from "mantine-react-table";

import { Container, Title, Box, Flex } from "@mantine/core";
import { useMemo } from "react";
import { IconDownload } from "@tabler/icons-react";

type BBody = { title: string; link: string; file: string | null };

type Post = {
  type: string;
  bbody: BBody;
  date: string;
};

export const Display = ({ news }: { news: Post[] }) => {
  // export const Display = () => {
  const columns = useMemo<MRT_ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: "type",
        header: "구분",
        size: 60,
        minSize: 80,
      },
      {
        accessorKey: "body",
        header: "Title",
        minSize: 450,
        Cell: ({ row }) => (
          <Flex justify="space-between">
            <a
              href={row.original.bbody.link}
              style={{ textDecoration: "none", color: "inherit" }}
              target="_blank"
            >
              <span>{row.original.bbody.title}</span>
            </a>
            <Box mt="0.2rem">
              {/* {row.original.bbody.link ? <a>icon</a> : null} */}
              {row.original.bbody.file ? (
                <a href={row.original.bbody.file}>
                  <IconDownload
                    stroke={1.75}
                    size={"1.2rem"}
                    color={"#868e96"}
                  />
                </a>
              ) : null}
            </Box>
          </Flex>
        ),
      },
      {
        accessorKey: "date", //normal accessorKey
        header: "Date",
        size: 60,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: news, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
    mantineTableProps: {
      striped: true,
    },
    mantinePaperProps: { withBorder: false, shadow: "none" },
    // layoutMode: "grid",
    // mantineTableHeadCellProps: { ta: "center" },
    // mantineTableBodyCellProps: { ta: "center" },
    enableRowNumbers: true,
  });

  return (
    <Container size={1300}>
      <Title>Newsroom</Title>
      <MantineReactTable table={table} />
    </Container>
  );
};
