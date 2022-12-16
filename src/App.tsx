import { Button, notification } from 'antd'
import { differenceInMinutes, format } from 'date-fns'
import formatDistance from 'date-fns/formatDistance'
import { useState, useEffect } from 'react'
import './App.scss'
import { mockData } from './data/mockData'
import { LicensePlate, ParkingSpace, ParkingSpaceType, ParkingTicket } from './types/types'

const renderLicensePlate = (licensePlate: LicensePlate) => `${licensePlate.value.slice(0, 2)} ${licensePlate.value.slice(2)}`

const generateLicensePlate = () => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var numbers = '0123456789'
  var charactersLength = characters.length
  var numbersLength = numbers.length
  for (var i = 0; i < 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  for (var i = 0; i < 5; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbersLength))
  }
  return result
}

const generateUID = (data: ParkingSpace[]) => {
  let result: number
  do {
    result = Math.floor(Math.random() * 10000)
    // eslint-disable-next-line no-loop-func
  } while (!!data.find((parkingspace: ParkingSpace) => parkingspace.currentParkingTicket?.id === result))
  return result
}

const parkingDuration = (startDate: Date) => differenceInMinutes(new Date(), new Date(startDate))

const parkingDurationFormatted = (startDate: Date) => formatDistance(new Date(), new Date(startDate), { includeSeconds: true })

const calculateParkingCost = (startDate: Date, rate1 = 40, rate2 = 30, rate3 = 10) => {
  let cost = 0,
    nMinutes = parkingDuration(startDate)
  if (nMinutes >= 60) {
    nMinutes -= 60
    cost += 40
  } else return (nMinutes * 40.0) / 60.0
  if (nMinutes >= 120) {
    nMinutes -= 120
    cost += 30
  } else return cost + (nMinutes * 30.0) / 60.0
  return cost + (nMinutes * 10.0) / 60.0
}

const parkingEndedNotification = ({ licensePlate, id, startDate }: ParkingTicket) =>
  notification.success({
    message: 'Parking ended',
    description: `Summary for ticket #${id}:\n
    License plate: ${renderLicensePlate(licensePlate)} 
    Parking started: ${format(new Date(startDate), 'MMM d, yyyy, H:mm:ss')}
    Parking ended: ${format(new Date(), 'MMM d, yyyy, H:mm:ss')}
    Parking duration: ${(parkingDuration(startDate) / 60.0).toFixed(2)} hours
    Parking cost: ${calculateParkingCost(startDate)?.toFixed(2)} NOK`,
    duration: 15,
    style: { whiteSpace: 'pre-line' },
  })

const parkingStartedNotification = ({ licensePlate, id, startDate }: ParkingTicket) =>
  notification.info({
    message: 'Parking started',
    description: `Created new ticket #${id}:\n
    License plate: ${renderLicensePlate(licensePlate)} 
    Parking started: ${format(new Date(startDate), 'MMM d, yyyy, H:mm:ss')}`,
    duration: 15,
    style: { whiteSpace: 'pre-line' },
  })

const App = () => {
  const [garageState, setGarageState] = useState(mockData)
  const [showInfoMsg, setShowInfoMsg] = useState('')
  const [n, setN] = useState(Math.random())
  console.log('mockData: ', mockData)
  let nFloors = Array.from(new Set(garageState.map((item: ParkingSpace) => item.floor)))
  const getAvailableParkingSpacesOnFloor = (floor: number) => {
    return garageState
      .filter((parkingSpace) => parkingSpace.floor === floor)
      .filter((parkingSpace) => !parkingSpace.currentParkingTicket?.licensePlate?.value)
  }
  const getNumberOfAvailableParkingSpacesOnFloor = (floor: number) => getAvailableParkingSpacesOnFloor(floor).length

  const getTotalParkingSpacesOnFloor = (floor: number) => garageState.filter((parkingSpace) => parkingSpace.floor === floor)

  const getNumberOfTotalParkingSpacesOnFloor = (floor: number) => garageState.filter((parkingSpace) => parkingSpace.floor === floor).length

  const getTotalAvailableParkingSpaces = (garage: ParkingSpace[]) =>
    garage.filter((parkingspace) => !parkingspace.currentParkingTicket?.licensePlate?.value).length

  const handleToggleParking = (parkingTicket: ParkingTicket | undefined, parkingSpace: ParkingSpace) => {
    let targetParkingSpace = garageState.find((parkingspace) => parkingspace.id === parkingSpace.id)
    if (!targetParkingSpace) return
    if (parkingTicket) {
      console.log('Is occupied')
      parkingEndedNotification(parkingTicket)
      targetParkingSpace.currentParkingTicket = undefined
      setGarageState((prev) => {
        return prev.map((item) => (item.id === parkingSpace.id ? { ...item, currentParkingTicket: undefined } : item))
      })
    } else {
      const newParkingTicket: ParkingTicket = {
        id: generateUID(garageState),
        startDate: new Date(),
        licensePlate: { value: generateLicensePlate() },
      }
      parkingStartedNotification(newParkingTicket)

      targetParkingSpace.currentParkingTicket = newParkingTicket
      console.log('Is available')
      setGarageState((prev) => {
        return prev.map((item) => (item.id === parkingSpace.id ? { ...item, currentParkingTicket: newParkingTicket } : item))
      })
    }
  }

  const getTypeText = (type: ParkingSpaceType) => {
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

  const renderTicket = (parkingSpace: ParkingSpace, n = 0) => {
    const { id: parkingSpaceId, type, currentParkingTicket, floor } = parkingSpace
    return (
      <div className="parking-spaces-text">
        <div
          className={`parking-spaces-text__img parking-background`}
          onClick={() => handleToggleParking(currentParkingTicket, parkingSpace)}
        />
        <div
          className={`parking-spaces-text__img ${currentParkingTicket ? 'parking-occupied' : 'alex'}`}
          onClick={() => handleToggleParking(currentParkingTicket, parkingSpace)}
        />
        <h3 className="parking-spaces-text__id">
          {`${parkingSpaceId}
          (${getTypeText(type)})`}
        </h3>
        {currentParkingTicket ? (
          <>
            <h4 className="parking-spaces-text__ticket">Current ticket (#{currentParkingTicket.id}):</h4>
            <span className="parking-spaces-text__license-text">License plate:</span>
            <span className="parking-spaces-text__license-value">{renderLicensePlate(currentParkingTicket.licensePlate)}</span>
            <span className="parking-spaces-text__start-text">Parking started: </span>
            <span className="parking-spaces-text__start-value">
              {format(new Date(currentParkingTicket.startDate), 'MMM d, yyyy, H:mm:ss')}{' '}
            </span>
            <span className="parking-spaces-text__duration-text">Parking duration: </span>
            <span className="parking-spaces-text__duration-value">{parkingDurationFormatted(currentParkingTicket.startDate)}</span>
            <span className="parking-spaces-text__cost-text">Parking cost: </span>
            <span className="parking-spaces-text__cost-value">{calculateParkingCost(currentParkingTicket.startDate)?.toFixed(2)} NOK </span>
          </>
        ) : (
          <h4 className="parking-spaces-text__ticket">Available</h4>
        )}
      </div>
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setN(Math.random())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <span className="dnb-logo" role="img" data-ratio="1.453690625" aria-hidden="true">
          <svg width="64" viewBox="0 0 93.0362 64">
            <title>DNB Logo</title>
            <path d="M89.668 31.9442a10.6487 10.6487 0 0 0-1.8465-1.2184l-.178-.0887.1554-.1337a8.7063 8.7063 0 0 0 2.7652-6.848c-.006-3.3331-1.1437-5.82-3.413-7.3936-1.9135-1.3528-4.5588-2.0142-8.092-2.0079l-10.1326.0182a1.081 1.081 0 0 0-1.0645 1.0685l.0597 33.2203a1.0667 1.0667 0 0 0 1.0685 1.0646l11.577-.0208c3.644-.0065 6.5758-.7897 8.684-2.3266a8.6558 8.6558 0 0 0 2.7937-3.4054 11.2675 11.2675 0 0 0 .9913-4.868 8.967 8.967 0 0 0-3.3681-7.0605zM71.1547 17.5795l7.9106-.0142q4.1997-.0076 6.202 1.3885c.8454.5985 2.003 1.752 2.0083 4.7074.0095 5.2883-4.1672 5.7179-5.4338 5.7201l-10.6659.0192zm9.4066 28.7366l-9.355.0168-.0244-13.6438 10.6659-.0191c4.6219-.0083 7.8707 2.6072 7.8774 6.3407.0033 1.8.0131 7.289-9.1639 7.3054z"></path>
            <path d="M22.4948 19.6221a14.0642 14.0642 0 0 0-5.5848-4.101 16.8443 16.8443 0 0 0-6.2238-1.1443l-9.6215.0173A1.086 1.086 0 0 0 0 15.4853L.0597 48.683a1.0668 1.0668 0 0 0 1.0686 1.0646l9.6214-.0173a16.3939 16.3939 0 0 0 6.2197-1.1667 13.8015 13.8015 0 0 0 5.57-4.0994c3.3924-4.1833 3.894-9.4508 3.889-12.2284-.0043-2.3544-.3927-8.2876-3.9336-12.6136zm-2.5144 22.758a11.615 11.615 0 0 1-9.2366 4.0615l-7.3773.0133-.0516-28.7535 7.3772-.0132a11.5412 11.5412 0 0 1 9.2512 4.0271c2.9396 3.5948 3.1714 8.9716 3.1742 10.5264.0042 2.3338-.3878 6.7559-3.137 10.1384z"></path>
            <path d="M59.9016 0l.0877 48.7976a.9801.9801 0 0 1-.6872.956.7852.7852 0 0 1-.311.0678 1.011 1.011 0 0 1-.8229-.4217L36.3643 21.7303l.076 42.2638L33.1294 64l-.0879-48.9083a.9989.9989 0 0 1 .7094-.956.706.706 0 0 1 .311-.045 1.0218 1.0218 0 0 1 .8229.3978l21.8038 27.6922L56.6128.0059z"></path>
          </svg>
          <span className="dnb-logo-text"> Garage</span>
        </span>
        <div className="dnb-logo-subtext">
          <span>Current availability: {`${getTotalAvailableParkingSpaces(garageState)}/${garageState.length}`}</span>
        </div>
      </header>
      <main>
        <p className="info-text">Click on parking spaces to simulate starting/ending parking.</p>
        {nFloors.map((floor: number) => {
          return (
            <div key={floor}>
              <div className="parking-floor-container">
                <h2>
                  {`Floor ${floor} (${getNumberOfAvailableParkingSpacesOnFloor(floor)}/${getNumberOfTotalParkingSpacesOnFloor(
                    floor
                  )} available):`}
                </h2>
                <div className="parking-spaces-container">
                  {getTotalParkingSpacesOnFloor(floor).map((parkingSpace) => {
                    return <div key={parkingSpace.id}>{renderTicket(parkingSpace, n)}</div>
                  })}
                </div>
              </div>
              <hr />
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default App
