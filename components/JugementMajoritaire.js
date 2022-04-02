import Image from 'next/image'
import {candidates, grades} from '../lib/constants'

const Voter = ({grade, name}) => {

  return (<div className='ui button'>{grade}</div>)
}

const Candidate = ({name, photo, parti}) => (<div className='ui grid candidate'>
  <div className='ui two wide column'>
    <div className='photo'>
      <Image src={photo} width={92} height={92} />
    </div>
  </div>
  <div className='ui twelve wide column'>
    <h3>{name}</h3>
    <div className='ui grades'>
      {grades.map((grade, i) => (<Voter name={name} grade={grade} />))}
    </div>
  </div>
</div>)


const JugementMajoritaire = () => (<div className='ui container jm'>
  <div className='row'>
    {candidates.map((candidate, i) => (<div className='column'><Candidate key={i} {...candidate} /></div>))}
  </div>
</div>)

export default JugementMajoritaire;
