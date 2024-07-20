"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/registry/new-york/ui/checkbox";

// import { labels, priorities, statuses } from "../data/data";
import { Task } from "@/data/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { date } from "zod";
// import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "listingId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Listing ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-primary/30">
        {row.getValue("listingId")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "eventName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("eventName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price per ticket" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>${row.getValue("price")}</span>
          {row.original.obo.toString() === "true" && (
            <Badge variant="outline" className="ml-2">
              OBO
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "ticketCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="# Available" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("ticketCount")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "eventDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("eventDate"));
      return (
        <div className="flex w-[100px] items-center">
          <span>
            {date.getUTCMonth()}/{date.getUTCDate()}/{date.getUTCFullYear()}
          </span>
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue("eventDate"));
      const dateB = new Date(rowB.getValue("eventDate"));
      const diff = dateA.getTime() - dateB.getTime();
      if (diff === 0) {
        return 0;
      } else if (diff > 0) {
        return 1;
      }
      return -1;
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <button className=" w-max h-max mr-2 bg-emerald-500 text-white rounded-md p-2 hover:bg-emerald-600 transition-all">
            <span className=" inline-block" />
            Make Offer
          </button>
          <button className="  w-max h-max underline text-rose-400 rounded-md p-2 hover:bg-rose-100 transition-all">
            <span className=" inline-block" />
            Mark Sold
          </button>
        </div>
      );
      // <DataTableRowActions row={row} />,
    },
  },
];
