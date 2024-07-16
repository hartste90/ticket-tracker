// import { Listing } from "/api/listing";

import { Listing, createRandomListing } from "./listing";

//export a function called fetchListings that fetches a list of listings from the server
// export const fetchListings = async () => {
// let listings: Listing[] = [new Listing("Miss Thing", 2)];
// fetch("https://k4i6ycglle.execute-api.us-west-1.amazonaws.com/listings", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => {
//     if (response.status === 200) {
//       console.log("Request successful");
//     } else {
//       console.log("Request failed");
//     }
//     if (response.status === 400) throw new Error("Malformed request");
//     if (response.status === 401)
//       throw new Error("Request rejected: Unauthorized");
//     return response.json();
//   })
//   .then((data) => {
//     console.log("data is: ", data["Items"]);
//     return data["Items"];
//   })
//   .catch((error) => {
//     console.error("Error getting :", error);
//   });

//async function to wait 2 seconds and return listings
// export async function fetchListings() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([new Listing("Miss Thinggggs", 2)]);
//     }, 2000);
//   });

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
            throw new Error("Malformed request");
          } else if (response.status === 401) {
            reject("Request rejected: Unauthorized");
            throw new Error("Request rejected: Unauthorized");
          }
        })
        .catch((error) => {
          console.error("Error getting :", error);
          reject("Unknown error: " + error);
        });
    });
  }
}

function getFakeListings(numListings: number): Listing[] {
  let listings: Listing[] = [];
  for (let i = 0; i < numListings; i++) {
    listings.push(createRandomListing());
  }
  return listings;
}

export async function waitSeconds(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("waited " + seconds + " seconds");
      resolve();
    }, seconds * 1000);
  });
}
