import Image from 'next/image'
import calendar from '../public/calendar.svg'


const Calendar = ({remain}) => {
  return (
    <div className='ui calendar'>
      <Image src={calendar} alt='calendar logo' />
      <div className='text'>
        <div className='days'>
          J-{remain}
        </div>
        <div className='caption'>
          POUR PARTICIPER
        </div>
      </div>
    </div>
  )
}

export default Calendar
