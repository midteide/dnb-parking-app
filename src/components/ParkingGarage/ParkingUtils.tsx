import { InputNumber, notification } from 'antd'
import { differenceInMinutes, formatDistance } from 'date-fns'
import format from 'date-fns/format'
import React, { useMemo } from 'react'
import { LicensePlate, ParkingRate, ParkingSpace, ParkingSpaceType, ParkingTicket } from '../../types/types'

export const generateLicensePlate = () => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var numbers = '0123456789'
  var charactersLength = characters.length
  var numbersLength = numbers.length
  for (let i = 0; i < 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  for (let j = 0; j < 5; j++) {
    result += numbers.charAt(Math.floor(Math.random() * numbersLength))
  }
  return result
}

export const generateUID = (data: ParkingSpace[]) => {
  let result: number
  do {
    result = Math.floor(Math.random() * 10000)
    // eslint-disable-next-line no-loop-func
  } while (!!data.find((parkingspace: ParkingSpace) => parkingspace.currentParkingTicket?.id === result))
  return result
}

export const parkingDuration = (startDate: Date) => differenceInMinutes(new Date(), new Date(startDate))

export const parkingDurationFormatted = (startDate: Date) => formatDistance(new Date(), new Date(startDate), { includeSeconds: true })

export const ParkingCost: React.FC<{ startDate: Date; timeNow: Date; parkingRates: ParkingRate[] }> = React.memo(
  ({ startDate, parkingRates }) => (
    <span className="parking-spaces-text__cost-value">
      {useMemo(() => calculateParkingCost(startDate, parkingRates)?.toFixed(2), [startDate, parkingRates])} NOK{' '}
    </span>
  )
)

export const ParkingDuration: React.FC<{ startDate: Date; timeNow: Date }> = React.memo(({ startDate, timeNow }) => (
  <span className="parking-spaces-text__duration-value">{formatDistance(timeNow, new Date(startDate), { includeSeconds: true })}</span>
))

export const calculateParkingCost = (startDate: Date, parkingRates: ParkingRate[]) => {
  let cost = 0,
    nMinutes = parkingDuration(startDate)
  if (nMinutes >= 60) {
    nMinutes -= 60
    cost += parkingRates[0].rate
  } else return (nMinutes * parkingRates[0].rate) / 60.0
  if (nMinutes >= 120) {
    nMinutes -= 120
    cost += parkingRates[1].rate * 2
  } else return cost + (nMinutes * parkingRates[1].rate) / 60.0
  return cost + (nMinutes * parkingRates[2].rate) / 60.0
}

export const renderLicensePlate = (licensePlate: LicensePlate) => `${licensePlate.value.slice(0, 2)} ${licensePlate.value.slice(2)}`

export const showParkingEndedNotification = ({ licensePlate, id, startDate }: ParkingTicket, parkingRates: ParkingRate[]) =>
  notification.success({
    message: 'Parking ended',
    description: `Summary for ticket #${id}:\n
      License plate: ${renderLicensePlate(licensePlate)} 
      Parking started: ${format(new Date(startDate), 'MMM d, yyyy, H:mm:ss')}
      Parking ended: ${format(new Date(), 'MMM d, yyyy, H:mm:ss')}
      Parking duration: ${(parkingDuration(startDate) / 60.0).toFixed(2)} hours
      Parking cost: ${calculateParkingCost(startDate, parkingRates)?.toFixed(2)} NOK`,
    duration: 15,
    style: { whiteSpace: 'pre-line' },
  })

export const showParkingStartedNotification = ({ licensePlate, id, startDate }: ParkingTicket) =>
  notification.info({
    message: 'Parking started',
    description: `Created new ticket #${id}:\n
      License plate: ${renderLicensePlate(licensePlate)} 
      Parking started: ${format(new Date(startDate), 'MMM d, yyyy, H:mm:ss')}`,
    duration: 15,
    style: { whiteSpace: 'pre-line' },
  })

export const getTypeText = (type: ParkingSpaceType) => {
  switch (type) {
    case undefined:
      return null
    case ParkingSpaceType.COMPACT:
      return 'Compact'
    case ParkingSpaceType.HANDICAP:
      return 'Handicap'
    case ParkingSpaceType.LARGE:
      return 'Large'
    case ParkingSpaceType.MOTORCYCLE:
      return 'Motorcycle'
  }
}

export const ParkingRateInputs: React.FC<{ parkingRates: ParkingRate[]; setParkingRates: (val: ParkingRate[]) => void }> = React.memo(
  ({ parkingRates, setParkingRates }) => (
    <div className="rates-container">
      {parkingRates.map(({ id, rate, description }) => (
        <div key={id}>
          <p>{description}</p>
          <InputNumber
            defaultValue={rate}
            formatter={(value) => `Kr ${value},-`}
            onChange={(val) => {
              const p: ParkingRate[] = parkingRates.map((item: ParkingRate) => (item.id === id ? { ...item, rate: val! } : item))
              setParkingRates(p)
            }}
            title={description}
          />
        </div>
      ))}
    </div>
  )
)
