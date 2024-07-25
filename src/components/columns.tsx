"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/registry/new-york/ui/checkbox";

// import { labels, priorities, statuses } from "../data/data";
import { Task } from "@/data/schema";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { date } from "zod";
// import { DataTableRowActions } from "./data-table-row-actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Listing } from "@/api/listing";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    removeListing: (listingId: Listing) => void;
  }
}

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
    sortingFn: (rowA, rowB) => {
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
    accessorKey: "posterName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted By" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("posterName")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ getValue, row, column, table }) => {
      const removeListing = () => {
        table.options.meta?.removeListing(row.original as Listing);
      };

      return (
        <div>
          <Popover>
            <PopoverTrigger>
              <div className="w-max h-max mr-2 p-2 bg-emerald-500 text-white text-sm rounded-md hover:bg-emerald-600">
                Make Offer
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className=" ">
                <h1 className="text-lg">
                  <b>{row.original.eventName}</b>
                </h1>
                <div className="text-slate-500">
                  <h2>
                    contact:
                    {" " + row.original.posterName}
                  </h2>
                  <h2>
                    via:
                    {" " + row.original.posterNumber}
                  </h2>
                  {row.original.notes === undefined ? null : (
                    <h2>
                      notes:
                      {" " + row.original.notes}
                    </h2>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div className={"inline flex-row gap-x-2 whitespace-nowrap"}>
            <button
              className="  w-max h-max underline text-rose-400 rounded-md p-2 hover:bg-rose-100 transition-all"
              onClick={removeListing}
            >
              Mark Sold
            </button>
          </div>
        </div>
      );
    },
  },
];
