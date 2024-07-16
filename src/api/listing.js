// export const Listing = {
//   eventName: String,
//   //   eventDate: Date,
//   ticketNum: Number,
//   //   price: Number,
//   //   obo: Boolean,
// };

export default class Listing {
  constructor(eventName, ticketNum) {
    this.eventName = eventName;
    this.ticketNum = ticketNum;
    this.eventDate = new Date();
    this.price = 0;
    this.obo = false;
  }
}
