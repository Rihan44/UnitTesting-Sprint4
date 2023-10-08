
class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }
    
    isOccupied(date) {
        for (const booking of this.bookings) {
            if (booking.date === date)
                return true;
        }
        return false;
    }

    occupancyPercentage(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        const checkStartDate = new Date(startDate).getTime();
        const checkEndDate = new Date(endDate).getTime();
        const nighCount = Math.abs(checkEndDate - checkStartDate) / oneDay;
        const bookingsLength = this.bookings.length;
        const chequear = (checkEndDate > (new Date(this.bookings[bookingsLength - 1].date)) && checkStartDate < (new Date(this.bookings[0].date)))

        if (chequear) {
            const roomOccupancy = this.bookings.length
            const porcentage = (roomOccupancy * 100) / nighCount
            return Math.ceil(porcentage)

        } else {
            throw new Error('Error')
        }
    }
}

module.exports = Room;

/* class Booking {
    constructor(name, email, check_in, check_out, discount, room) {
        this.name = name;
        this.email = email;
        this.check_in = check_in;
        this.check_out = check_out;
        this.discount = discount;
        this.room = {
            name,
            rate,
            discount
        }
    }

    get fee() {

    }
}

module.exports = Booking; */

