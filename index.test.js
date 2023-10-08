const Room = require('./index.js');
/* const Booking = require('./index.js'); */

describe('Is Occupied?', () => {
    test('isOccupied is false when the room is occupied in a given date', () => {
        const room = new Room('Room 1', [{startDate: '2023-10-07'}, {endDate: '2023-10-12'}], 150, 10);
        const isOccupied = room.isOccupied('2023-10-08');
        expect(isOccupied).toBe(true);
    })
})

describe('Is room occupied?', () => {
    it('obtener el porcentage de ocupacion entre un rango de fechas', () => {
      const room2 = new Room('habitacion 2', [
        {date: '2023-10-02'}, 
        {date: '2023-10-03'}, 
        {date: '2023-10-04'}, 
        {date: '2023-10-05'}, 
        {date: '2023-10-06'}
      ], 140, 10);
      const startDate = '2023-10-01'
        const endDate = '2023-10-07'
      const percentageRoom = room2.occupancyPercentage(startDate, endDate)
      expect(percentageRoom).toBe(84)
    })
  })