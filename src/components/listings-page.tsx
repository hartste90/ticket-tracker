//page that displays listings in a chart that can be sorted
import { use, useEffect, useState } from "react";
import { fetchListings, waitSeconds, addListing } from "api/listings";
import { Listing, createRandomListing } from "api/listing";
import { UserNav } from "./user-nav";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { BugPlay, CircleDollarSign, RefreshCcw } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateListingDialog from "./create-listing-dialog";

export default function ListingsPage() {
  const [listingData, setListingData] = useState<Listing[]>([]);
  const [status, setStatus] = useState("loading");
  const [tasks, setTasks] = useState<Listing[]>([]);
  const [createListingModalOpen, setCreateListingModalOpen] = useState(false);

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

  return (
    <>
      <div className="md:hidden "></div>
      <div className="hidden h-full flex-1 flex-col space-y-6 p-8 md:flex ">
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
        <div className="my-1">
          <button
            className=" w-max h-max px-5 py-3 mr-5 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
            onClick={async () => {
              await refreshListingData();
            }}
          >
            <RefreshCcw className="mr-2 h-4 w-4 inline-block" />
            Refresh
          </button>
          <button
            className=" w-max h-max px-5 py-3 mr-5 bg-red-500 text-white rounded-sm hover:bg-blue-600"
            onClick={async () => {
              await addRandomListing();
            }}
          >
            <BugPlay className="mr-2 h-4 w-4 inline-block" />
            Add Listing
          </button>
          <Dialog
            open={createListingModalOpen}
            onOpenChange={setCreateListingModalOpen}
          >
            <DialogTrigger>
              <div className=" w-max h-max px-5 py-3 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                <CircleDollarSign className="mr-2 h-5 w-5 inline-block" />
                Sell My Ticket(s)
              </div>
            </DialogTrigger>
            <CreateListingDialog
              setCreateListingModalOpen={setCreateListingModalOpen}
            />
          </Dialog>
        </div>
        <DataTable data={tasks} columns={columns} />
        <div id="footer" className="min-h-32" />
      </div>
    </>
  );
}
