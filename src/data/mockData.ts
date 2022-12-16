import { ParkingGarage, ParkingSpace, ParkingSpaceType } from '../types/types'

// export const mockData: ParkingGarage = {
//   id: 1,
//   floors: [
//     {
//       id: 1,
//       parkingSpaces: [
//         {
//           id: 101,
//           type: ParkingSpaceType.COMPACT,
//         },
//         {
//           id: 102,
//           type: ParkingSpaceType.HANDICAP,
//           currentParkingTicket: {
//             id: 1,
//             licensePlate: { id: 1, value: 'BR34567' },
//             startDate: new Date('Thu Dec 15 2022 18:11:55 GMT+0100 (Central European Standard Time)'),
//           },
//         },
//         {
//           id: 103,
//           type: ParkingSpaceType.LARGE,
//           currentParkingTicket: {
//             id: 2,
//             licensePlate: { id: 2, value: 'ND50203' },
//             startDate: new Date(),
//           },
//         },
//         {
//           id: 104,
//           type: ParkingSpaceType.MOTORCYCLE,
//         },
//         {
//           id: 105,
//           type: ParkingSpaceType.COMPACT,
//         },
//       ],
//       story: 1,
//     },
//     {
//       id: 2,
//       parkingSpaces: [
//         {
//           id: 201,
//           type: ParkingSpaceType.COMPACT,
//         },
//         {
//           id: 202,
//           type: ParkingSpaceType.HANDICAP,
//         },
//         {
//           id: 203,
//           type: ParkingSpaceType.LARGE,
//         },
//         {
//           id: 204,
//           type: ParkingSpaceType.MOTORCYCLE,
//         },
//         {
//           id: 205,
//           type: ParkingSpaceType.COMPACT,
//         },
//       ],
//       story: 2,
//     },
//   ],
// }
export const mockData: ParkingSpace[] = [
  {
    id: 101,
    floor: 1,
    type: ParkingSpaceType.COMPACT,
  },
  {
    id: 102,
    floor: 1,
    type: ParkingSpaceType.HANDICAP,
    currentParkingTicket: {
      id: 1,
      licensePlate: { value: 'BR34567' },
      startDate: new Date('Thu Dec 16 2022 11:11:55 GMT+0100 (Central European Standard Time)'),
    },
  },
  {
    id: 103,
    floor: 1,
    type: ParkingSpaceType.LARGE,
    currentParkingTicket: {
      id: 2,
      licensePlate: { value: 'ND50203' },
      startDate: new Date(),
    },
  },
  {
    id: 104,
    floor: 1,
    type: ParkingSpaceType.MOTORCYCLE,
  },
  {
    id: 105,
    floor: 1,
    type: ParkingSpaceType.COMPACT,
  },
  {
    id: 201,
    floor: 2,
    type: ParkingSpaceType.COMPACT,
  },
  {
    id: 202,
    floor: 2,
    type: ParkingSpaceType.HANDICAP,
  },
  {
    id: 203,
    floor: 2,
    type: ParkingSpaceType.LARGE,
  },
  {
    id: 204,
    floor: 2,
    type: ParkingSpaceType.MOTORCYCLE,
  },
  {
    id: 205,
    floor: 2,
    type: ParkingSpaceType.COMPACT,
  },
  {
    id: 303,
    floor: 3,
    type: ParkingSpaceType.LARGE,
  },
  {
    id: 304,
    floor: 3,
    type: ParkingSpaceType.MOTORCYCLE,
  },
  {
    id: 305,
    floor: 3,
    type: ParkingSpaceType.COMPACT,
  },
]
