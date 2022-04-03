import Image from 'next/image'
import {candidates} from '../lib/constants'

const Voter = ({name, onSubmit}) => {
  const handleSubmit = (e) => {
    onSubmit && onSubmit({name})
  }

  return (<div onClick={handleSubmit} className='ui button'>Voter</div>)
}

const Candidate = ({name, photo, parti, onSubmit}) => (<div className='ui  candidate'>
  <h3>{name}</h3>
  <div className='photo'>
    <Image src={photo} width={92} height={92} alt={name} />
  </div>
  <Voter name={name} onSubmit={onSubmit} />
</div>)


const SingleChoice = ({onSubmit}) => (<div className='ui container sm'>
  <div className='ui grid three column'>
    {candidates.map((candidate, i) => (<div key={i} className='column'><Candidate onSubmit={onSubmit} {...candidate} /></div>))}
  </div>
</div>)

export default SingleChoice;
