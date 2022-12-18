import { memo, useMemo } from 'react'
import { ParkingRate, ParkingSpace } from '../../types/types'
import ParkingFloor from './ParkingFloor'
import './parkingGarage.scss'

const ParkingGarage: React.FC<{
  garageData: ParkingSpace[]
  parkingRates: ParkingRate[]
  handleToggleParking: (parkingSpace: ParkingSpace) => void
}> = memo(({ garageData, parkingRates, handleToggleParking }) => {
  const nFloors = useMemo(() => Array.from(new Set(garageData.map((item: ParkingSpace) => item.floor))), [garageData])

  return (
    <>
      {nFloors.map((floor: number) => (
        <div key={floor}>
          <ParkingFloor handleToggleParking={handleToggleParking} garageData={garageData} floor={floor} parkingRates={parkingRates} />
          <hr />
        </div>
      ))}
    </>
  )
})

export default ParkingGarage
