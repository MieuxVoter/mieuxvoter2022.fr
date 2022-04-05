import {useState, useEffect} from 'react'
import Image from 'next/image'
import {checkMajorityJugdment} from '../lib/utils'
import ErrorToast from './Toast'


const Candidate = ({name, photo, parti, onClick, grade, grades}) => {
  const [selected, setSelected] = useState(grade);

  const handleClick = (e) => {
    setSelected(e.target.dataset.grade);
    onClick && onClick({name: name, grade: e.target.dataset.grade})
  }

  return (<div className='ui candidate'>
    <div className='ui stackable grid '>
      <div className='ui two wide column'>
        <div className='photo'>
          <Image src={photo} width={92} height={92} alt={name} />
        </div>
      </div>
      <div className='ui twelve wide column'>
        <h3>{name}</h3>
        <div className='ui grades'>
          {grades.map((grade, i) => {
            if (selected == grade) {
              return (<div key={i} className='ui button primary'>{grade}</div>)
            } else {
              return (<div key={i} data-grade={grade} onClick={handleClick} className='ui button'>{grade}</div>)
            }
          })}

        </div>
      </div>
    </div>
  </div >)
}

const MajorityJugdment = ({candidates, grades, onSubmit}) => {
  const [ballot, setBallot] = useState({});
  const [error, setError] = useState();
  const [isDone, setDone] = useState(false);

  const handleClick = ({name, grade}) => {
    ballot[name] = grade;
    setBallot(ballot);
    const check = checkMajorityJugdment(ballot, candidates, grades)
    setDone(check)
  }

  const handleSubmit = () => {
    if (isDone) {
      onSubmit && onSubmit(ballot);
    } else {
      setError('Veuillez juger tous les candidats.')
      const timer = setTimeout(() => {
        setError(undefined);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }

  return (<div className='ui container jm'>
    <h2> Pour présider la France, ayant pris tous les éléments en compte, jugez-vous en conscience
      que ce(tte) candidat(e) serait…</h2>
    <p>
      Dans le cadre de cette étude, vous êtes amenés à vous prononcer sur les candidats à l&apos;élection présidentielle selon deux modes de scrutin différents : le scrutin
      uninominal majoritaire et le scrutin par jugement majoritaire.
    </p>
    <p>
      Le jugement majoritaire est un mode de scrutin où l&apos;électeur doit évaluer tous les
      candidats indépendamment les uns des autres, en leur attribuant une mention sur
      une échelle qui va de « Excellent » à « A rejeter ». Le candidat le mieux évalué par
      une majorité remporte l’élection. »
    </p>
    <div className='row'>
      {candidates.map((candidate, i) => (<div key={i} className='column'><Candidate grades={grades} grade={ballot[candidate.name]} {...candidate} onClick={handleClick} /></div>))}
    </div>
    <div className='row'>
      <div onClick={handleSubmit} className={`fluid ui ${isDone ? '' : 'disabled'} button`}>Je vote</div>
    </div>
    {error && <ErrorToast msg={error} />}
  </div>)
}

export default MajorityJugdment;
