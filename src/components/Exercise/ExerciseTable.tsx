import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import { FC } from "react";
import { AppRouterTypes, trpc } from "../../utils/trpc";
import { ArrElement } from "../../utils/typescript";

type ExerciseTableProps = {
  category: string;
  search: string;
  show_description: boolean;
};

export const ExerciseTable: FC<ExerciseTableProps> = (props) => {
  const { search, category, show_description } = props;
  const { data, isLoading, error } = trpc.exercises.getFiltered.useQuery(
    {
      search,
      category,
    },
    { refetchOnWindowFocus: false }
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There has been an error loading the table</div>;
  if (!data) return null;
  if (data.length == 0) return <div>No data to return</div>;
  return <RenderTable data={data} show_description={show_description} />;
};

type RenderTableProps = {
  data: AppRouterTypes["exercises"]["getFiltered"]["output"];
  show_description: boolean;
};

const RenderTable: FC<RenderTableProps> = ({ data }) => {
  const columnHelper =
    createColumnHelper<ArrElement<RenderTableProps["data"]>>();
  const columns = [
    columnHelper.display({
      id: "edit",
      cell: (props) => (
        <Link href={`/exercises/edit/${props.row.original.id}`} passHref={true}>
          <a>
            <PencilSquareIcon className="h-6 w-6 text-indigo-500" />
          </a>
        </Link>
      ),
    }),
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
    }),
    // columnHelper.accessor("description", {
    //   cell: (info) => <ReactMarkdown>{info.getValue()}</ReactMarkdown>,
    //   header: () => <span>Description</span>,
    // }),
    columnHelper.accessor("category.name", {
      header: () => <span>Category</span>,
    }),
    columnHelper.accessor("muscles", {
      cell: (info) =>
        info
          .getValue()
          .map((e) => e.name)
          .join(", "),
      header: () => <span>Muscles</span>,
    }),
    columnHelper.accessor("equipment", {
      cell: (info) =>
        info
          .getValue()
          .map((e) => e.name)
          .join(", "),
      header: () => <span>Equipment</span>,
    }),
    columnHelper.accessor("license_author", {
      header: () => <span>Author</span>,
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th
                  className="border-b p-4 pl-8 pt-0 pb-3 text-left"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b p-4 pl-8 pt-0 pb-3 text-left" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="border-b p-4 pl-8" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
};
