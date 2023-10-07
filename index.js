class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.rate = discount;
    }
}

/* Properties:
○ Name - string
○ Bookings - array of Booking objects
○ Rate - int price in cents
○ Discount - int percentage
● Methods:
○ isOccupied(date) returns false if not occupied, returns
true if occupied
○ occupancyPercentage(startDate, endDate) returns the
percentage of days with occupancy within the range of
dates provided (inclusive)
● Static methods:
○ totalOccupancyPercentage(rooms, startDate, endDate)
returns the total occupancy percentage across all
rooms in the array
○ availableRooms(rooms, startDate, endDate) returns an
array of all rooms in the array that are not occupied for
the entire duration */