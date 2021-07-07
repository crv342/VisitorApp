// import moment from 'moment';

class Visitor {
  constructor(id, name, checkIn, checkOut, host, purpose) {
    this.id = id;
    this.name = name;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.host = host;
    this.purpose = purpose;
  }

  // get readableCheckInDate() {
  //   return moment(this.checkIn).format('MMMM Do YYYY, hh:mm');
  // }
  // get readableCheckOutDate() {
  //   if (!this.checkOut) {
  //     return this.checkOut;
  //   }
  //   return moment(this.checkOut).format('MMMM Do YYYY, hh:mm');
  // }
}

export default Visitor;
