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
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value: any) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "listingId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Listing ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("listingId")}</div>
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
      //   const label = labels.find(
      //     (label: { value: any }) => label.value === row.original.label
      //   );

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
  //   {
  //     accessorKey: "priority",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Priority" />
  //     ),
  //     cell: ({ row }) => {
  //       const priority = priorities.find(
  //         (priority) => priority.value === row.getValue("priority")
  //       );

  //       if (!priority) {
  //         return null;
  //       }

  //       return (
  //         <div className="flex items-center">
  //           {priority.icon && (
  //             <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //           )}
  //           <span>{priority.label}</span>
  //         </div>
  //       );
  //     },
  //     filterFn: (row, id, value) => {
  //       return value.includes(row.getValue(id));
  //     },
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <button className=" shadow-md w-max h-max mr-1 bg-emerald-500 text-white rounded-md p-2 hover:bg-emerald-600 transition-all">
            <span className=" inline-block" />
            Make Offer
          </button>
          <button className=" shadow-md w-max h-max border border-rose-500 text-rose-500 rounded-md p-2 hover:bg-rose-100 transition-all">
            <span className=" inline-block" />
            Mark Sold
          </button>
        </div>
      );
      // <DataTableRowActions row={row} />,
    },
  },
];
