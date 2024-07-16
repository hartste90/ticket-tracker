// export const Listing = {
//   eventName: String,
//   //   eventDate: Date,
//   ticketNum: Number,
//   //   price: Number,
//   //   obo: Boolean,
// };
import { faker } from "@faker-js/faker";

export interface Listing {
  eventName: string;
  ticketNum: number;
  eventDate: Date;
  price: number;
  obo: boolean;
  id: string;
  title: string;
}

export function createRandomListing(): Listing {
  const name = faker.person.fullName() + " Concert";
  return {
    eventName: name,
    ticketNum: faker.number.int({ min: 1, max: 5 }),
    eventDate: faker.date.soon({ days: 150 }),
    price: parseInt(faker.commerce.price({ min: 0, max: 1000 })),
    obo: faker.datatype.boolean(),
    id: faker.string.uuid().substring(0, 6),
    title: name,
  };
}

export class Listing {
  constructor(eventName: string, ticketNum: number) {
    this.eventName = eventName;
    this.ticketNum = ticketNum;
    this.eventDate = new Date();
    this.price = 0;
    this.obo = false;
  }
}
