"use client";

import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_TableOptions,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Container, Title, Box, Text, Flex } from "@mantine/core";
import classes from "./Posts.module.css";

import { IconDownload } from "@tabler/icons-react";

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

type BBody = { title: string; link: string; file: string | null };

type Post = {
  type: string;
  bbody: BBody;
  date: string;
};

const data: Post[] = [
  {
    type: "뉴스",
    bbody: {
      title: "미국DOE, 반도체 제조 공정의 디지털 트윈 기술 등 첨단 제조기술 발전촉진에 2억 8,500만 달러의 지원",
      link: "https://www.commerce.gov/news/press-releases/2024/11/chips-america-announces-new-proposed-285-million-award-chips",
      file: null,
    },
    date: "11-15-2024",
  },
  {
    type: "뉴스",
    bbody: {
      title: "정부, 'K반도체' 지원에 54억 쓴다는데…'충격 실상'",
      link: "https://n.news.naver.com/mnews/article/015/0005056964?sid=101",
      file: null,
    },
    date: "11-15-2024",
  },
  {
    type: "뉴스",
    bbody: {
      title: "한·오스트리아 경제포럼서 반도체·모빌리티 등 협력 교감",
      link: "https://n.news.naver.com/mnews/article/001/0015047556?sid=104",
      file: null,
    },
    date: "11-15-2024",
  },
  {
    type: "뉴스",
    bbody: {
      title: "HBM 왕국 우뚝 선 SK하이닉스…'숨은 주역' 한미반도체",
      link: "https://n.news.naver.com/mnews/article/277/0005500329?sid=101",
      file: null,
    },
    date: "11-15-2024",
  },
  {
    type: "공고",
    bbody: {
      title:
        "2025년 정보통신방송 연구개발사업 신규과제 후보과제(안) 인터넷 공시",
      link: "http://ezone.iitp.kr/common/anno/01/form.tab?PMS_DMSY_PBNC_ID=DSP2024011",
      file: null,
    },
    date: "11-15-2024",
  },
];

export const Posts = () => {
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
        // Header: ({ column }) => (
        //   <span style={{ paddingLeft: "-300px" }}>
        //     {column.columnDef.header}
        //   </span>
        // ),
        // mantineTableHeadCellProps: {
        //   align: "center",
        // },
        // mantineTableBodyCellProps: {
        //   align: "center",
        // },
      },
      {
        accessorKey: "date", //normal accessorKey
        header: "Date",
        size: 60,
        // mantineTableHeadCellProps: {
        //   align: "center",
        // },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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

// import { Container, Table } from "@mantine/core";

// const elements = [
//   { no: 1, title: 12.011, symbol: "C", name: "Carbon" },
//   { no: 2, title: 14.007, symbol: "N", name: "Nitrogen" },
//   { no: 3, title: 88.906, symbol: "Y", name: "Yttrium" },
//   { no: 4, title: 137.33, symbol: "Ba", name: "Barium" },
//   { no: 5, title: 140.12, symbol: "Ce", name: "Cerium" },
//   { no: 6, title: 12.011, symbol: "C", name: "1Carbon" },
//   { no: 7, title: 14.007, symbol: "N", name: "1Nitrogen" },
//   { no: 8, title: 88.906, symbol: "Y", name: "1Yttrium" },
//   { no: 9, title: 137.33, symbol: "Ba", name: "1Barium" },
//   { no: 10, title: 140.12, symbol: "Ce", name: "1Cerium" },
// ];

// export function Posts() {
//   const rows = elements.map((element) => (
//     <Table.Tr key={element.name}>
//       <Table.Td>{element.no}</Table.Td>
//       <Table.Td>{element.title}</Table.Td>
//       <Table.Td>{element.name}</Table.Td>
//       <Table.Td>{element.symbol}</Table.Td>

//     </Table.Tr>
//   ));

//   return (
//     <Container size={1000}>
//       <Table
//         stickyHeader
//         stickyHeaderOffset={60}
//         horizontalSpacing="sm"
//         striped
//         highlightOnHover
//       >
//         <Table.Thead>
//           <Table.Tr>
//             <Table.Th>No</Table.Th>
//             <Table.Th>Type</Table.Th>
//             <Table.Th>Title</Table.Th>
//             <Table.Th>Date</Table.Th>
//             <Table.Th>Agency</Table.Th>
//           </Table.Tr>
//         </Table.Thead>
//         <Table.Tbody>{rows}</Table.Tbody>
//         {/* <Table.Caption>Scroll page to see sticky thead</Table.Caption> */}
//       </Table>
//     </Container>
//   );
// }
