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
  <h2>Au premier tour de l&apos;élection présidentielle, pour lequel des candidats suivants avez-vous le plus chance de voter ?</h2>
  <p>
    Le scrutin uninominal majoritaire est le mode de scrutin en vigueur pour l&apos;élection
    présidentielle de 2022. Il demande à l’électeur de choisir un candidat.
  </p>
  <p>
    Dans le cadre de cette étude, vous êtes amenés à vous prononcer anonynement sur les candidats à l&apos;élection présidentielle selon deux modes de scrutin différents : le scrutin
    uninominal majoritaire et le scrutin par jugement majoritaire.
  </p>
  <div className='ui doubling stackable grid three column'>
    {candidates.map((candidate, i) => (<div key={i} className='column'><Candidate onSubmit={onSubmit} {...candidate} /></div>))}
  </div>
</div>)

export default SingleChoice;
