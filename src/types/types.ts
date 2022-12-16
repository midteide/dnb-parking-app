export enum ParkingSpaceType {
  COMPACT = 'type-compact',
  LARGE = 'type-large',
  HANDICAP = 'type-handicap',
  MOTORCYCLE = 'type-motorcycle',
}

export interface LicensePlate {
  value: string
}

export interface ParkingTicket {
  id: number
  licensePlate: LicensePlate
  startDate: Date
}

export interface ParkingSpace {
  id: number
  type: ParkingSpaceType
  currentParkingTicket?: ParkingTicket
  floor: number
}

export interface ParkingFloor {
  id: number
  parkingSpaces: ParkingSpace[]
  story: number
}

export interface ParkingGarage {
  id: number
  floors: ParkingFloor[]
}
