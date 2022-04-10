import {useState} from 'react'
import Image from 'next/image'
import {candidates} from '../lib/constants'

const Voter = ({name, confirmation, onConfirm, onSubmit}) => {
  const handleSubmit = (e) => {
    onSubmit && onSubmit({name})
  }
  const handleConfirm = (e) => {
    onConfirm && onConfirm({name})
  }

  if (confirmation) {
    return (<div onClick={handleSubmit} className='ui green button'>Confirmer</div>)
  } else {
    return (<div onClick={handleConfirm} className='ui button'>Voter</div>)
  }
}

const Candidate = ({name, photo, onSubmit}) => {
  const [confirmed, setConfirmation] = useState(false)

  const handleConfirm = () => {
    setConfirmation(true);
  }

  return (<div className={`ui ${confirmed ? "active" : ""} candidate`}>
    <h3>{name}</h3>
    <div className='photo'>
      <Image src={photo} width={92} height={92} alt={name} />
    </div>
    <Voter name={name} confirmation={confirmed} onConfirm={handleConfirm} onSubmit={onSubmit} />
  </div>)
}


const SingleChoice = ({onSubmit}) => (<div className='ui container sm'>
  <p>
    Le scrutin uninominal majoritaire est le mode de scrutin actuellement utilisé pour les élections présidentielles françaises.
    Il demande à l’électeur de choisir un candidat.
  </p>
  <p>
    Dans le cadre de cette étude, vous êtes amenés à vous prononcer anonynement sur les candidats à l&apos;élection présidentielle selon deux modes de scrutin différents : le scrutin
    uninominal majoritaire et le scrutin par jugement majoritaire.
  </p>
  <p>En indiquant vos intentions de vote, vous acceptez qu&apos;elles soient traitées de manière anonyme à des fins scientifiques.</p>
  <h2>Au premier tour de l&apos;élection présidentielle, pour lequel des candidats suivants avez-vous le plus de chance de voter ?</h2>
  <div className='ui doubling stackable grid three column'>
    {candidates.map((candidate, i) => (<div key={i} className='column'><Candidate onSubmit={onSubmit} {...candidate} /></div>))}
  </div>
</div>)

export default SingleChoice;
