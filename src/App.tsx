import { useCallback, useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import ParkingGarage from './components/ParkingGarage/ParkingGarage'
import {
  generateLicensePlate,
  generateUID,
  showParkingEndedNotification,
  ParkingRateInputs,
  showParkingStartedNotification,
} from './components/ParkingGarage/ParkingUtils'
import { mockData, parkingRatesMock } from './data/mockData'
import { ParkingRate, ParkingSpace, ParkingTicket } from './types/types'

const App = () => {
  const [garageState, setGarageState] = useState(mockData)
  const [parkingRates, setParkingRates] = useState<ParkingRate[]>(parkingRatesMock)

  const getTotalAvailableParkingSpaces = (garage: ParkingSpace[]) =>
    garage.filter((parkingspace) => !!parkingspace.currentParkingTicket).length

  const handleToggleParking = useCallback(
    (parkingSpace: ParkingSpace) => {
      let targetParkingSpace = garageState.find((parkingspace) => parkingspace.id === parkingSpace.id)
      if (!targetParkingSpace) return
      if (targetParkingSpace.currentParkingTicket) {
        setGarageState((prev) => prev.map((item) => (item.id === parkingSpace.id ? { ...item, currentParkingTicket: undefined } : item)))
        showParkingEndedNotification(targetParkingSpace.currentParkingTicket, parkingRates)
      } else {
        const newParkingTicket: ParkingTicket = {
          id: generateUID(garageState),
          startDate: new Date(),
          licensePlate: { value: generateLicensePlate() },
        }
        setGarageState((prev) =>
          prev.map((item) => (item.id === parkingSpace.id ? { ...item, currentParkingTicket: newParkingTicket } : item))
        )
        showParkingStartedNotification(newParkingTicket)
      }
    },
    [garageState, parkingRates]
  )

  return (
    <div className="App">
      <main>
        <Header availableParkingSpacesTotal={`${getTotalAvailableParkingSpaces(garageState)}/${garageState.length}`} />
        <p className="info-text">Click on parking spaces to simulate starting/ending parking.</p>
        <ParkingRateInputs parkingRates={parkingRates} setParkingRates={setParkingRates} />
        <ParkingGarage garageData={garageState} handleToggleParking={handleToggleParking} parkingRates={parkingRates} />
      </main>
    </div>
  )
}

export default App
