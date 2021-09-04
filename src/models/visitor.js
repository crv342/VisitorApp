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
}

export default Visitor;
