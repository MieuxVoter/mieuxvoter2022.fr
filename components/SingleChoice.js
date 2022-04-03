import Image from 'next/image'
import {candidates} from '../lib/constants'

const Voter = ({name}) => {

  return (<div className='ui button'>Voter</div>)
}

const Candidate = ({name, photo, parti}) => (<div className='ui grid candidate'>
  <div className='ui six wide column'>
    <div className='photo'>
      <Image src={photo} width={92} height={92} />
    </div>
  </div>
  <div className='ui ten wide column'>
    <h3>{name}</h3>
    <Voter name={name} />
  </div>
</div>)


const SingleChoice = () => (<div className='ui container sm'>
  <div className='ui grid four column'>
    {candidates.map((candidate, i) => (<div className='column'><Candidate key={i} {...candidate} /></div>))}
  </div>
</div>)

export default SingleChoice;
