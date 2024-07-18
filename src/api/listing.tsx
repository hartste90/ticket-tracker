import { faker } from "@faker-js/faker";

export interface Listing {
  listingId: string;
  eventName: string;
  ticketCount: number;
  eventDate: Date;
  price: number;
  obo: boolean;
  posterName: string;
  posterNumber: string;
  postDate: Date;
  tier?: string;
  city?: string;
  notes?: string;
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
    posterName:
      faker.person.firstName() + " " + faker.string.alpha().toUpperCase() + ".",
    posterNumber: faker.phone.number(),
    postDate: new Date(),
    city: faker.location.city(),
    tier: faker.helpers.arrayElement(["", "VIP", "GA"]),
  };
}

export function createListingFromForm(formValues: any): Listing {
  let listing: Listing = {
    listingId: faker.string.uuid().substring(0, 8),
    eventName: formValues.eventName,
    ticketCount: parseInt(formValues.ticketCount),
    eventDate: formValues.eventDate,
    price: parseInt(formValues.price),
    obo: formValues.obo,
    posterName: formValues.posterName,
    posterNumber: formValues.posterNumber,
    postDate: new Date(),
    city: formValues.city?.length > 0 ? formValues.city : undefined,
    tier: formValues.tier?.length > 0 ? formValues.tier : undefined,
    notes: formValues.notes?.length > 0 ? formValues.notes : undefined,
  };
  return listing;
}
