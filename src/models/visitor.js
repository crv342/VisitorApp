// import moment from 'moment';

class Visitor {
  constructor(
    id,
    name,
    phone,
    address,
    gender,
    dob,
    checkIn,
    checkOut,
    host,
    purpose,
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.gender = gender;
    this.dob = dob;
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
