// import { Listing } from "/api/listing";

import { Listing, createRandomListing } from "./listing";

export async function fetchListings(useFakeData?: boolean): Promise<Listing[]> {
  if (useFakeData) {
    console.log("Using fake data");
    const NUM_FAKE_LISTINGS = 10;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getFakeListings(NUM_FAKE_LISTINGS));
      }, 1000);
    });
  } else {
    console.log("Using real data");
    return new Promise((resolve, reject) => {
      fetch("https://k4i6ycglle.execute-api.us-west-1.amazonaws.com/listings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          let res = await response.json();
          if (response.status === 200) {
            resolve(res.Items);
          } else if (response.status === 400) {
            reject("Malformed request");
          } else if (response.status === 401) {
            reject("Request rejected: Unauthorized");
          }
        })
        .catch((error) => {
          console.error("Error getting :", error);
          reject("Unknown error: " + error);
        });
    });
  }
}

export async function addListing(listing: Listing) {
  console.log("Adding new listing: ", toPostData(listing));
  return new Promise((resolve, reject) => {
    fetch("https://k4i6ycglle.execute-api.us-west-1.amazonaws.com/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toPostData(listing)),
    })
      .then(async (response) => {
        let res = await response.json();
        if (response.status === 200) {
          resolve({ success: true, message: "Success" });
        } else if (response.status === 400) {
          reject({ success: false, message: "Malformed request" });
        } else if (response.status === 401) {
          reject({ success: false, message: "Request rejected: Unauthorized" });
        }
      })
      .catch((error) => {
        console.error("Error adding listing:", error);
        reject({ success: false, message: "Unknown error: " + error });
      });
  });
}

function getFakeListings(numListings: number): Listing[] {
  let listings: Listing[] = [];
  for (let i = 0; i < numListings; i++) {
    listings.push(createRandomListing());
  }
  return listings;
}

function toPostData(listing: Listing) {
  return {
    TableName: "ticketData",
    Item: {
      listingId: listing.listingId.toString(),
      eventName: listing.eventName.toString(),
      ticketCount: listing.ticketCount.toString(),
      eventDate: listing.eventDate.toString(),
      price: listing.price.toString(),
      obo: listing.obo.toString(),
      posterName: listing.posterName.toString(),
      posterNumber: listing.posterNumber.toString(),
      postDate: listing.postDate.toString(),
      tier: listing.tier ? listing.tier.toString() : undefined,
      city: listing.city ? listing.city.toString() : undefined,
      notes: listing.notes ? listing.notes.toString() : undefined,
    },
  };
}

export async function waitSeconds(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("waited " + seconds + " seconds");
      resolve();
    }, seconds * 1000);
  });
}
