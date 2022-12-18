import { memo } from 'react'
import { ParkingRate, ParkingSpace } from '../../types/types'
import ParkingSpaceItem from './ParkingSpaceItem'

const ParkingFloor: React.FC<{
  floor: number
  parkingRates: ParkingRate[]
  garageData: ParkingSpace[]
  handleToggleParking: (parkingSpace: ParkingSpace) => void
}> = memo(({ floor, parkingRates, garageData, handleToggleParking }) => {
  const totalParkingSpacesOnFloor: ParkingSpace[] = garageData.filter((parkingSpace) => parkingSpace.floor === floor)

  const availableParkingSpacesOnFloor = garageData
    .filter((parkingSpace) => parkingSpace.floor === floor)
    .filter((parkingSpace) => !parkingSpace.currentParkingTicket?.licensePlate?.value)

  const numberOfAvailableParkingSpacesOnFloor = availableParkingSpacesOnFloor.length

  const numberOfTotalParkingSpacesOnFloor = totalParkingSpacesOnFloor.length

  return (
    <div className="parking-floor-container">
      <h2>{`Floor ${floor} (${numberOfAvailableParkingSpacesOnFloor}/${numberOfTotalParkingSpacesOnFloor} available):`}</h2>
      <div className="parking-spaces-container">
        {totalParkingSpacesOnFloor.map((parkingSpace) => (
          <ParkingSpaceItem
            parkingSpace={parkingSpace}
            handleToggleParking={handleToggleParking}
            key={parkingSpace.id}
            parkingRates={parkingRates}
          />
        ))}
      </div>
    </div>
  )
})

export default ParkingFloor
