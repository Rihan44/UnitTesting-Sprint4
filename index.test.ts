const { Room, Booking } = require('./index.ts');

describe('Room Tests', () => {
  it('isOccupied is true cuando la habitacion esta ocupada en una fecha dada', () => {

    const room = new Room('room1', [], 150, 10);

    const booking1 = new Booking('booking1', 'prueba@gmail.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking2', 'prueba2@gmail.com', '2023-10-07', '2023-10-15', 10, room);

    const room1 = new Room(room.name, [
      booking1,
      booking2,
    ], room.rate, room.discount);

    const isOccupiedTest1 = room1.isOccupied('2023-10-10');
    expect(isOccupiedTest1).toBe(true);
  });

  it('isOccupied is false cuando la habitacion no esta ocupada en una fecha dada', () => {
    const room = new Room('room1', [], 150, 10);

    const booking1 = new Booking('booking1', 'prueba@gmail.com', '2023-10-01', '2023-10-06', 20, room);
    const booking2 = new Booking('booking2', 'prueba2@gmail.com', '2023-10-07', '2023-10-15', 20, room);

    const room1 = new Room(room.name, [
      booking1,
      booking2,
    ], room.rate, room.discount);

    const isOccupiedTest1 = room1.isOccupied('2023-10-16');
    expect(isOccupiedTest1).toBe(false);
  });

  it('occupancyPercentage tiene que devolver 100 si todas las fechas estan dentro del rango de bookings', () => {
    const room = new Room('room1', [], 150, 10);

    const booking1 = new Booking('booking1', 'prueba@gmail.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking2', 'prueba2@gmail.com', '2023-10-07', '2023-10-15', 10, room);

    const room1 = new Room(room.name, [
      booking1,
      booking2,
    ], room.rate, room.discount);

    const isOccupiedTest3 = room1.occupancyPercentage('2023-09-01', '2023-09-15');

    expect(isOccupiedTest3).toBe(0);
  });

  test("occupancyPercentage tiene que devolver 100 si todas las fechas pasadas al metodo están dentro del rango de bookings", () => {
    const room = new Room('Room1', [], 150, 10);

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-15",
      10,
      room
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-16",
      "2023-09-30",
      10,
      room
    );

    const booking3 = new Booking(
      "booking 3",
      "bok2@bok.es",
      "2023-10-01",
      "2023-10-31",
      10,
      room
    );

    const bookings = [booking1, booking2, booking3];

    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const percentage = room1.occupancyPercentage("2023-09-01", "2023-09-30");

    expect(percentage).toBe(100);
  });

  test("totalOccupancyPercentage tiene que devolver 50 si las fechas pasadas al metodo ocupan el 50% del rango", () => {
    const roomA = new Room('roomA', [], 150, 10);

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = new Room('roomB', [], 150, 10);

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-16",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const percentage = Room.totalOccupancyPercentage(
      roomArray,
      "2023-09-01",
      "2023-09-30"
    );

    expect(percentage).toBe(50);
  });

  test("totalOccupancyPercentage tiene que devolver 100 si las fechas pasadas al metodo ocupan el 100% del rango", () => {
    const roomA = new Room('roomA', [], 150, 10);

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = new Room('roomB', [], 150, 10);

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const percentage = Room.totalOccupancyPercentage(
      roomArray,
      "2023-09-01",
      "2023-09-15"
    );

    expect(percentage).toBe(100);
  });
  test("totalOccupancyPercentage tiene que devolver 0 si las fechas pasadas al metodo están fuera del rango", () => {
    const roomA = new Room('roomA', [], 150, 10);

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = new Room('roomB', [], 150, 10);

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-16",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const percentage = Room.totalOccupancyPercentage(
      roomArray,
      "2023-10-01",
      "2023-10-15"
    );

    expect(percentage).toBe(0);
  });

  /* ESTE TEST FALLA COMO SI NO ESTUVIERA BIEN HECHA LA LOGICA */
  test("totalOccupancyPercentage tiene que devolver 0 si los datos pasados son cualquier otro dato erroneo", () => {
    const fakeData = ["hola", "mundo"];

    const percentage = Room.totalOccupancyPercentage([], "hola", "mundo");
    const percentage1 = Room.totalOccupancyPercentage([], '', "2023-10-15");
    const percentage2 = Room.totalOccupancyPercentage([], "2023-10-15", "mundo");
    const percentage3 = Room.totalOccupancyPercentage([], "2023-10-01", "2023-10-15");

    expect(percentage).toBe(0);
    expect(percentage1).toBe(0);
    expect(percentage2).toBe(0);
    expect(percentage3).toBe(0);
  });

  test('availableRooms tiene que devolver una room', () => {
    const room1 = new Room('room1', [], 150, 10);
    const room2 = new Room('room2', [], 150, 10);

    const booking1 = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      10,
      room1
    );

    const booking2 = new Booking(
      "booking2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      room2
    );

    const booking3 = new Booking(
      "booking3",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      10,
      room2
    );

    const booking4 = new Booking(
      "booking4",
      "bok2@bok.es",
      "2023-10-07",
      "2023-10-15",
      10,
      room1
    );

    const bookingsB = [booking3, booking2];
    const bookingsA = [booking1, booking4];

    const room_1 = new Room(room1.name, bookingsA, room1.rate, room1.discount);
    const room_2 = new Room(room2.name, bookingsB, room2.rate, room2.discount);

    const roomArray = [room_1, room_2];

    const availableRooms = Room.availableRooms(roomArray, '2023-09-01', '2023-10-01');
    expect(availableRooms).toEqual([room_1]);

  });

  test('availableRooms tiene que devolver dos rooms', () => {
    const room1 = new Room('room1', [], 150, 10);
    const room2 = new Room('room2', [], 150, 10);

    const booking1 = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      10,
      room1
    );

    const booking2 = new Booking(
      "booking2",
      "bok2@bok.es",
      "2023-11-07",
      "2023-11-15",
      10,
      room2
    );

    const booking3 = new Booking(
      "booking3",
      "bok@bok.es",
      "2023-11-01",
      "2023-11-06",
      10,
      room2
    );

    const booking4 = new Booking(
      "booking4",
      "bok2@bok.es",
      "2023-10-07",
      "2023-10-15",
      10,
      room1
    );

    const bookingsB = [booking3, booking2];
    const bookingsA = [booking1, booking4];

    const room_1 = new Room(room1.name, bookingsA, room1.rate, room1.discount);
    const room_2 = new Room(room2.name, bookingsB, room2.rate, room2.discount);

    const roomArray = [room_1, room_2];

    const availableRooms = Room.availableRooms(roomArray, '2023-09-01', '2023-10-01');
    expect(availableRooms).toEqual([room_1, room_2]);

  });

  test('availableRooms no tiene que devolver ninguna room', () => {
    const room1 = new Room('room1', [], 150, 10);
    const room2 = new Room('room2', [], 150, 10);

    const booking1 = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      10,
      room1
    );

    const booking2 = new Booking(
      "booking2",
      "bok2@bok.es",
      "2023-11-07",
      "2023-11-15",
      10,
      room2
    );

    const booking3 = new Booking(
      "booking3",
      "bok@bok.es",
      "2023-11-01",
      "2023-11-06",
      10,
      room2
    );

    const booking4 = new Booking(
      "booking4",
      "bok2@bok.es",
      "2023-10-07",
      "2023-10-15",
      10,
      room1
    );

    const bookingsB = [booking3, booking2];
    const bookingsA = [booking1, booking4, booking3];

    const room_1 = new Room(room1.name, bookingsA, room1.rate, room1.discount);
    const room_2 = new Room(room2.name, bookingsB, room2.rate, room2.discount);

    const roomArray = [room_1, room_2];

    const availableRooms = Room.availableRooms(roomArray, '2023-10-07', '2023-11-15');
    expect(availableRooms).toEqual([]);

  });

  test('availableRooms tiene ambas rooms', () => {
    const room1 = new Room('room1', [], 150, 10);
    const room2 = new Room('room2', [], 150, 10);

    const booking1 = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      10,
      room1
    );

    const booking2 = new Booking(
      "booking2",
      "bok2@bok.es",
      "2023-11-07",
      "2023-11-15",
      10,
      room2
    );

    const booking3 = new Booking(
      "booking3",
      "bok@bok.es",
      "2023-11-01",
      "2023-11-06",
      10,
      room2
    );

    const booking4 = new Booking(
      "booking4",
      "bok2@bok.es",
      "2023-10-07",
      "2023-10-15",
      10,
      room1
    );

    const bookingsB = [booking3, booking2];
    const bookingsA = [booking1, booking4];

    const room_1 = new Room(room1.name, bookingsA, room1.rate, room1.discount);
    const room_2 = new Room(room2.name, bookingsB, room2.rate, room2.discount);

    const roomArray = [room_1, room_2];

    const availableRooms = Room.availableRooms(roomArray, '2023-08-01', '2023-09-31');
    expect(availableRooms).toEqual([room_1, room_2]);

  });

})

describe('Bookings tests', () => {
  test('fee test debe devolver un precio distinto al inicial', () => {
    const room = new Room('room2', [], 150, 20);

    const booking = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      10,
      room
    );

    const fee = booking.getFee();
    expect(fee).toBe(108);
  });

  test('fee test debe devolver el precio inicial al no tener ningún descuento', () => {
    const room = new Room('room2', [], 150, 0);

    const booking = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      0,
      room
    );

    const fee = booking.getFee();
    expect(fee).toBe(150);
  });

  test('fee test debe devolver el precio solo con el descuento de la room', () => {
    const room = new Room('room2', [], 150, 20);

    const booking = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      0,
      room
    );

    const fee = booking.getFee();
    expect(fee).toBe(120);
  });

  test('fee test debe devolver el precio solo con el descuento de la booking', () => {
    const room = new Room('room2', [], 150, 0);

    const booking = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      50,
      room
    );

    const fee = booking.getFee();
    expect(fee).toBe(75);
  });

  test('fee test debe devolver el 0 si el descuento es del 100% en ambos casos o solo en uno', () => {
    const room = new Room('room2', [], 150, 100);

    const booking = new Booking(
      "booking1",
      "bok@bok.es",
      "2023-10-16",
      "2023-10-31",
      0,
      room
    );

    const fee = booking.getFee();
    expect(fee).toBe(0);
  });

});