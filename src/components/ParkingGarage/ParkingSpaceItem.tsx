import format from 'date-fns/format'
import { memo, useEffect, useState } from 'react'
import { ParkingRate, ParkingSpace } from '../../types/types'
import { getTypeText, ParkingCost, ParkingDuration, renderLicensePlate } from './ParkingUtils'

const ParkingSpaceItem: React.FC<{
  parkingSpace: ParkingSpace
  parkingRates: ParkingRate[]
  handleToggleParking: (parkingSpace: ParkingSpace) => void
}> = memo(({ parkingSpace, parkingRates, handleToggleParking }) => {
  const [timeNow, setTimeNow] = useState(new Date())
  const { id: parkingSpaceId, type, currentParkingTicket } = parkingSpace
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="parking-spaces-text">
      <div className={`parking-spaces-text__img parking-background`} onClick={() => handleToggleParking(parkingSpace)} />
      <div
        className={`parking-spaces-text__img ${currentParkingTicket ? 'parking-enter-animation' : 'parking-exit-animation'}`}
        onClick={() => handleToggleParking(parkingSpace)}
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
          <span className="parking-spaces-text__cost-text">Parking cost: </span>
          <ParkingDuration startDate={currentParkingTicket.startDate} timeNow={timeNow} />
          <ParkingCost startDate={currentParkingTicket.startDate} timeNow={timeNow} parkingRates={parkingRates} />
        </>
      ) : (
        <h4 className="parking-spaces-text__ticket">Available</h4>
      )}
    </div>
  )
})

export default ParkingSpaceItem
