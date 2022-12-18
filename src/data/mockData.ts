import { ParkingSpace, ParkingSpaceType } from '../types/types'

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

export const parkingRatesMock = [
  {
    id: 1,
    rate: 40,
    description: 'Rate for first hour',
  },
  {
    id: 2,
    rate: 30,
    description: 'Rate hour 2 and 3',
  },
  {
    id: 3,
    rate: 10,
    description: 'Rate after third hour',
  },
]
