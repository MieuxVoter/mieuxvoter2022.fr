import Image from 'next/image'
import {displayNumber} from '../lib/utils'


const Result = ({name, image, grade, rank, numVotes}) => {
  /**
   * name: candidate name
   * grade: fraction of votes for this candidate
   */
  const width = `${grade}%`
  return (
    <div className='ui sm'>
      <div className='ui card fluid'>
        <div className='ui content'>
          <div className='ui header'>
            <div className='ui image'>
              <Image src={image} alt={name} />
            </div>
            <div className={`rank ${rank == 1 ? 'active' : ''}`}>
              {rank}
            </div>
          </div>

          <div className='ui details'>
            <div className='ui title'>
              <h3 className='ui header'>{name}</h3>
            </div>
            <div className='stats'>
              <h3 className='ui header'>
                {width}
              </h3>
              <h6 className='ui header'>
                {displayNumber(numVotes)} votes
              </h6>
            </div>
            <div className='bar-row'>
              <div style={{flexBasis: width}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default Result;
