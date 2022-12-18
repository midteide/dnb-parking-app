import { sub } from 'date-fns'
import { mockData, parkingRatesMock } from '../../data/mockData'
import { calculateParkingCost, generateUID } from './ParkingUtils'

describe('Garage util functions', () => {
  test('generateUID() should never return a id already used in dataset', () => {
    let foundDuplicate = false
    const data = mockData
    for (let i = 0; i < 100000; i++) {
      if (!!data.find((parkingspace) => parkingspace.currentParkingTicket?.id === generateUID(data))) foundDuplicate = true
    }
    expect(foundDuplicate).not.toEqual(true)
  })

  test('calculateParkingCost should calculate costs correctly 0,5 hour', () => {
    const startDate = sub(new Date(), {
      minutes: 30,
    })
    const cost = calculateParkingCost(startDate, parkingRatesMock)
    expect(cost).toEqual(20)
  })
  test('calculateParkingCost should calculate costs correctly 1,5 hour', () => {
    const startDate = sub(new Date(), {
      hours: 1,
      minutes: 30,
    })
    const cost = calculateParkingCost(startDate, parkingRatesMock)
    expect(cost).toEqual(55)
  })
  test('calculateParkingCost should calculate costs correctly 3 hour', () => {
    const startDate = sub(new Date(), {
      hours: 3,
    })
    const cost = calculateParkingCost(startDate, parkingRatesMock)
    expect(cost).toEqual(100)
  })
  test('calculateParkingCost should calculate costs correctly 4,5 hour', () => {
    const startDate = sub(new Date(), {
      hours: 4,
      minutes: 30,
    })
    const cost = calculateParkingCost(startDate, parkingRatesMock)
    expect(cost).toEqual(115)
  })
})
