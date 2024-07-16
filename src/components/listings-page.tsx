//page that displays listings in a chart that can be sorted
import { use, useEffect, useState } from "react";
import { fetchListings, waitSeconds } from "api/listings";
import { Listing } from "api/listing";

export default function ListingsPage() {
  const [listingData, setListingData] = useState<Listing[]>([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    refreshListingData();
  }, []);

  async function refreshListingData() {
    setStatus("fetching");
    const res: Listing[] = await fetchListings(false);
    console.log("listings: ", res);
    setListingData(res);
    setStatus("loaded");
  }

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
                {listing.eventName} - {listing.ticketNum}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
