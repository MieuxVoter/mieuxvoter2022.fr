import {useState} from 'react'
import Image from 'next/image'
import blankVoting from '../public/img/blank-vote.svg'


const Candidate = ({name, photo, active, onClick}) => {
  return (<div onClick={() => onClick(name)} className={`ui ${active ? "active" : ""} candidate`}>
    <div className='photo'>
      <Image src={photo} width={92} height={92} alt={name} />
    </div>
    <h3 className="ui  header">{name}</h3>
  </div>)
}


const SingleChoice = ({stepId, candidates, onSubmit}) => {
  const [ballot, setBallot] = useState({});
  const [error, setError] = useState();
  const [isSubmittable, setSubmittable] = useState(false);

  const handleClick = (name) => {
    setBallot(name);
    setSubmittable(true)
  }

  const handleSubmit = () => {
    if (isSubmittable) {
      onSubmit && onSubmit('sm', {name: ballot});
    } else {
      setError('Veuillez juger tous les candidats.')
      const timer = setTimeout(() => {
        setError(undefined);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }

  const candidatesAndBlank = [...candidates];
  candidatesAndBlank.push({
    name: "Vote blanc",
    photo: blankVoting,
  })

  return (<div className='ui container sm'>
    <h2 className='ui header'>{stepId}/2</h2>
    <p>
      Le scrutin uninominal majoritaire est le mode de scrutin actuellement utilisé pour les élections présidentielles françaises. Il demande à l’électeur de choisir un candidat.
    </p>
    <h3 className='ui header'>Pour lequel des candidats suivants avez-vous le plus de chance de voter ?</h3>
    <div style={{marginTop: "2em"}} className={`ui doubling stackable grid ${candidatesAndBlank.length == 2 ? 'two' : 'three'} column`}>
      {candidatesAndBlank.map((candidate, i) => (<div key={i} className='column'><Candidate active={candidate.name == ballot} onClick={handleClick} {...candidate} /></div>))}
    </div>
    <div style={{margin: '2em'}} className='row'>
      <div className='ui centered grid'>
        <div onClick={handleSubmit} style={{paddingLeft: "4em", paddingRight: "4em"}} className={`ui big ${isSubmittable ? '' : 'disabled'} primary button`}>Je valide mon vote{'   '}
          <i className="right arrow icon"></i>
        </div>
      </div>
    </div>
  </div>)
}

export default SingleChoice;
