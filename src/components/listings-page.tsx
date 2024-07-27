//page that displays listings in a chart that can be sorted
import { useEffect, useState } from "react";
import { fetchListings, waitSeconds, addListing } from "api/listings";
import { Listing, createRandomListing } from "api/listing";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { BugPlay, CircleDollarSign, RefreshCcw } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateListingDialog from "@/components/create-listing-dialog";
import RemoveListingDialog from "@/components/remove-listing-dialog";
import NoMobileWarning from "./no-mobile-warning";
import FeedbackFooter from "./feedback-footer";

export default function ListingsPage() {
  const [tasks, setTasks] = useState<Listing[]>([]);
  const [createListingModalOpen, setCreateListingModalOpen] = useState(false);
  const [removeListingModalOpen, setRemoveListingModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    refreshListingData();
  }, []);

  async function refreshListingData() {
    const res: Listing[] = await fetchListings(false);
    console.log("listings: ", res);
    setTasks(res);
  }

  async function addRandomListing() {
    const newListing: Listing = createRandomListing();
    console.log("new listing: ", newListing);
    const res = await addListing(newListing);
    console.log("add listing res: ", res);
    await refreshListingData();
  }

  function onMarkSold(listing: Listing) {
    setSelectedListing(listing);
    setRemoveListingModalOpen(true);
  }

  return (
    <>
      {/* <NoMobileWarning /> */}
      <div className=" h-full flex-1 flex-col space-y-6 p-1 md:p-8 md:flex ">
        <div className="flex items-center justify-between space-y-2">
          <div className="p-8 md:p-0">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome to the Ticket Tracker!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s the available listings for events around San
              Francisco.
            </p>
          </div>
        </div>
        <div className="my-1">
          <button
            className=" w-max h-max px-5 py-3 mr-5 bg-blue-500 text-white text-sm rounded-sm hover:bg-blue-600"
            onClick={async () => {
              await refreshListingData();
            }}
          >
            <RefreshCcw className="mr-2 h-4 w-4 inline-block" />
            Refresh
          </button>
          <Dialog
            open={createListingModalOpen}
            onOpenChange={setCreateListingModalOpen}
          >
            <DialogTrigger>
              <div className="w-max h-max px-5 py-3 bg-blue-500 text-white text-sm rounded-sm hover:bg-blue-600">
                <CircleDollarSign className="mr-2 h-5 w-5 inline-block" />
                Sell My Ticket(s)
              </div>
            </DialogTrigger>
            <CreateListingDialog
              setCreateListingModalOpen={setCreateListingModalOpen}
              refreshListingData={refreshListingData}
            />
          </Dialog>

          <>
            <Dialog
              open={removeListingModalOpen}
              onOpenChange={setRemoveListingModalOpen}
            >
              <DialogTrigger>
                {process.env.NODE_ENV == "development" && (
                  <div className="w-max h-max px-5 py-3 ml-5 bg-red-500 text-white text-sm rounded-sm hover:bg-red-600">
                    <BugPlay className="mr-2 h-5 w-5 inline-block" />
                    Remove Listing
                  </div>
                )}
              </DialogTrigger>
              <RemoveListingDialog
                setRemoveListingModalOpen={setRemoveListingModalOpen}
                refreshListingData={refreshListingData}
                listing={selectedListing}
              />
            </Dialog>
            {process.env.NODE_ENV == "development" && (
              <button
                className="w-max h-max px-5 py-3 ml-5 bg-red-500 text-white text-sm rounded-sm hover:bg-blue-600"
                onClick={async () => {
                  await addRandomListing();
                }}
              >
                <BugPlay className="mr-2 h-4 w-4 inline-block" />
                Add Listing
              </button>
            )}
          </>
        </div>
        <DataTable
          data={tasks}
          columns={columns}
          onMarkSoldCallback={onMarkSold}
        />
        <div id="footer" className="min-h-32" />
      </div>
      <FeedbackFooter />
    </>
  );
}
