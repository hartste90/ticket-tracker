import { faker } from "@faker-js/faker";

export interface Listing {
  listingId: string;
  eventName: string;
  ticketCount: number;
  eventDate: Date;
  price: string;
  obo: boolean;
  posterName: string;
  posterNumber: string;
  postDate?: Date;
  tier?: string;
  eventAddress?: string;
  notes?: string;
}

export function createRandomListing(): Listing {
  const name = faker.person.fullName() + " Concert";
  return {
    listingId: faker.string.uuid().substring(0, 8),
    eventName: name,
    ticketCount: faker.number.int({ min: 1, max: 5 }),
    eventDate: faker.date.soon({ days: 150 }),
    price: faker.commerce.price({ min: 0, max: 120 }),
    obo: faker.datatype.boolean(),
    posterName:
      faker.person.firstName() + " " + faker.string.alpha().toUpperCase() + ".",
    posterNumber: faker.phone.number(),
    postDate: new Date(),
    eventAddress: faker.location.streetAddress(),
    tier: faker.helpers.arrayElement(["", "VIP", "GA"]),
  };
}

export function createListingFromForm(formValues: any): Listing {
  let listing: Listing = {
    listingId: faker.string.uuid().substring(0, 8),
    eventName: formValues.eventName,
    ticketCount: parseInt(formValues.ticketCount),
    eventDate: formValues.eventDate,
    price: formValues.price,
    obo: formValues.obo,
    posterName: formValues.posterName,
    posterNumber: formValues.posterNumber,
    postDate: new Date(),
    eventAddress:
      formValues.eventAddress?.length > 0 ? formValues.eventAddress : undefined,
    tier: formValues.tier?.length > 0 ? formValues.tier : undefined,
    notes: formValues.notes?.length > 0 ? formValues.notes : undefined,
  };
  return listing;
}
