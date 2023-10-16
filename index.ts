
interface RoomInterface {
  name: string;
  bookings: Booking[] | [];
  rate: number;
  discount: number;
}

class Room implements RoomInterface{
  name: string;
  bookings: Booking[] | [];
  rate: number;
  discount: number;

  constructor(name: string, bookings: Booking[] | [], rate: number, discount: number) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date: Date | string) {
    const myDate = new Date(date);

    for (let i = 0; i < this.bookings.length; i++) {
      const startDate = new Date(this.bookings[i].checkIn);
      const endDate = new Date(this.bookings[i].checkOut);

      if (myDate >= startDate && myDate <= endDate) {
        return true;
      }
    }

    return false;
  }

  occupancyPercentage(startingDate: Date | string, endingDate: Date | string) {
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    let totalDaysInRange = 0;
    let occupiedDays = 0;

    for(let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {

      totalDaysInRange++;

      let isOccupied = false;

      for(const booking of this.bookings) {
        const bookingStartDate = new Date(booking.checkIn);
        const bookingEndDate = new Date(booking.checkOut);
        bookingStartDate.setHours(0, 0, 0, 0);
        bookingEndDate.setHours(23, 59, 59, 999);

        if (currentDate >= bookingStartDate && currentDate <= bookingEndDate) {
          isOccupied = true;
          break;
        }
      }

      if (isOccupied) {
        occupiedDays++;
      }
    }

    if (totalDaysInRange === 0) {
      return 0;
    }

    const percentage = (occupiedDays / totalDaysInRange) * 100;

    return parseFloat(percentage.toFixed(1));
  }

  static totalOccupancyPercentage(rooms: Room[], startDate: Date | string, endDate: Date | string) {

    if(!Array.isArray(rooms) || rooms.every((room) => !(room instanceof Room))) {
      return 0;
    }

    function countDays(startDate: any, endDate: any) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
    }

    let totalOccupiedDays = 0;
    let totalDaysInRange = countDays(new Date(startDate), new Date(endDate));

    if (totalDaysInRange === 0) {
      return 0;
    }

    rooms.forEach((room) => {
      totalOccupiedDays += room.occupancyPercentage(startDate, endDate);
    });

    const percentage = (totalOccupiedDays / rooms.length).toFixed(1);

    return parseFloat(percentage);
  }

  static availableRooms(rooms: Room[], startDate: Date | string, endDate: Date | string) {

    let availableRooms: Room[] = [];

    for(let room of rooms) {
      const ocuppied = room.isOccupied(startDate) || room.isOccupied(endDate);
      
      if(!ocuppied) {
        availableRooms.push(room);
      }
    }

    return availableRooms;
  }
}

class Booking {
  name: string;
  email: string;
  checkIn: Date | string;
  checkOut: Date | string;
  discount: number;
  room: Room;

  constructor(name: string, email: string, checkIn: Date | string, checkOut: Date | string, discount: number, room: Room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee() {

    let priceDiscount = (this.room.rate * this.room.discount ) / 100;

    let priceWithRoomDiscount = this.room.rate - priceDiscount;

    let bookingPriceDiscount = (priceWithRoomDiscount * this.discount) / 100;

    let finalPrice = priceWithRoomDiscount - bookingPriceDiscount;

    return finalPrice;

  }
}

module.exports = {
  Room,
  Booking
};

