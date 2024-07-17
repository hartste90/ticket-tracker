//page that displays listings in a chart that can be sorted
import { use, useEffect, useState } from "react";
import { fetchListings, waitSeconds, addListing } from "api/listings";
import { Listing, createRandomListing } from "api/listing";
import { UserNav } from "./user-nav";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { z } from "zod";
import { BugPlay } from "lucide-react";

export default function ListingsPage() {
  const [listingData, setListingData] = useState<Listing[]>([]);
  const [status, setStatus] = useState("loading");
  const [tasks, setTasks] = useState<Listing[]>([]);

  useEffect(() => {
    refreshListingData();
  }, []);

  async function refreshListingData() {
    setStatus("fetching");
    const res: Listing[] = await fetchListings(false);
    console.log("listings: ", res);
    setListingData(res);
    setTasks(res);
    setStatus("loaded");
  }

  async function addRandomListing() {
    setStatus("adding");
    const newListing: Listing = createRandomListing();
    console.log("new listing: ", newListing);
    const res = await addListing(newListing);
    console.log("add listing res: ", res);
    await refreshListingData();
  }

  async function getTasks() {
    const data = [
      {
        id: "TASK-8782",
        title:
          "You can't compress the program without quantifying the open-source SSD pixel!",
      },
      {
        id: "TASK-7878",
        title:
          "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      },
      {
        id: "TASK-7839",
        title: "We need to bypass the neural TCP card!",
      },
      {
        id: "TASK-5562",
        title:
          "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      },
      {
        id: "TASK-8686",
        title:
          "I'll parse the wireless SSL protocol, that should driver the API panel!",
      },
    ];

    // const tasks = JSON.parse(data.toString());
    console.log("tasks: ", data);

    // return z.array(taskSchema).parse(tasks);
  }

  return (
    <>
      <div className="md:hidden"></div>

      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="">
          <button
            className=" w-max h-max px-5 py-3 mr-5 bg-myrtle_green text-white rounded-md p-2 hover:bg-onyx-600"
            onClick={async () => {
              await refreshListingData();
            }}
          >
            Refresh Listings
          </button>
          <button
            className=" w-max h-max px-5 py-3 bg-myrtle_green text-white rounded-md p-2 hover:bg-onyx-600"
            onClick={async () => {
              await addRandomListing();
            }}
          >
            <BugPlay className="mr-2 h-4 w-4 inline-block" />
            Add Listing
          </button>
        </div>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome to the Ticket Tracker!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s the listings for events in the next 6 months
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={tasks} columns={columns} />
        <div id="footer" className="min-h-32" />
      </div>
    </>
  );

  return (
    <div className="flex items-center justify-center p-10 w-screen h-screen">
      {status}
      {/* {status === "fetching" && <p>Fetching...</p>} */}
      {status === "error" && <p>Error fetching listings</p>}
      <div className=" bg-onyx-500 rounded-2xl w-full max-w-2xl p-10">
        <h1 className="text-center text-xl mb-5 text-white">Listings</h1>
        <div className="w-full flex flex-col justify-center items-center">
          <button
            className=" bg-myrtle_green text-white rounded-md p-2 hover:bg-onyx-600"
            onClick={async () => {
              await refreshListingData();
            }}
          >
            Refresh Listings
          </button>
          <p className="mb-2 text-old_gold">
            <b>Here are the current listings:</b>
          </p>
          <div className="w-full flex flex-col justify-center items-center">
            {listingData.map((listing) => (
              <p key={listing.eventName}>
                {listing.eventName} - {listing.ticketCount}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
