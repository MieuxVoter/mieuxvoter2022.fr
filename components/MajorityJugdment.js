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

const MajorityJugdment = ({candidates, grades, stepId, onSubmit}) => {
  const [ballot, setBallot] = useState({});
  const [error, setError] = useState();
  const [isSubmittable, setSubmittable] = useState(false);

  const handleClick = ({name, grade}) => {
    setBallot(oldBallot => {oldBallot[name] = grade; return oldBallot;});
    const check = checkMajorityJugdment(ballot, candidates, grades)
    setSubmittable(check)
  }

  const handleSubmit = () => {
    if (isSubmittable) {
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
    <h2 className='ui header'>{stepId + 1}/2</h2>
    <p>
      Le jugement majoritaire est un mode de scrutin où l&apos;électeur doit évaluer tous les
      candidats indépendamment les uns des autres, en leur attribuant une mention sur
      une échelle qui va de « Excellent » à « À rejeter ». Le candidat le mieux évalué par
      une majorité remporte l’élection.
    </p>
    <h3 className="ui header"> Pour présider la France, ayant pris tous les éléments en compte, jugez-vous en conscience
      que ce(tte) candidat(e) serait…</h3>
    <div style={{marginTop: "2em"}} className='row'>
      {candidates.map((candidate, i) => (<div key={i} className='column'><Candidate grades={grades} grade={ballot[candidate.name]} {...candidate} onClick={handleClick} /></div>))}
    </div>
    <div style={{margin: '2em'}} className='row'>
      <div className='ui centered grid'>
        <div onClick={handleSubmit} style={{paddingLeft: "4em", paddingRight: "4em"}} className={`ui big ${isSubmittable ? '' : 'disabled'} primary button`}>Je valide mon vote{'   '}
          <i className="right arrow icon"></i>
        </div>
      </div>
    </div>
    {error && <ErrorToast msg={error} />}
  </div>)
}

export default MajorityJugdment;
