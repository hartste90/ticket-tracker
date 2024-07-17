// export const Listing = {
//   eventName: String,
//   //   eventDate: Date,
//   ticketNum: Number,
//   //   price: Number,
//   //   obo: Boolean,
// };
import { faker } from "@faker-js/faker";

export interface Listing {
  listingId: string;
  eventName: string;
  ticketCount: number;
  eventDate: Date;
  price: number;
  obo: boolean;
}

export function createRandomListing(): Listing {
  const name = faker.person.fullName() + " Concert";
  return {
    listingId: faker.string.uuid().substring(0, 8),
    eventName: name,
    ticketCount: faker.number.int({ min: 1, max: 5 }),
    eventDate: faker.date.soon({ days: 150 }),
    price: parseInt(faker.commerce.price({ min: 0, max: 120 })),
    obo: faker.datatype.boolean(),
  };
}
