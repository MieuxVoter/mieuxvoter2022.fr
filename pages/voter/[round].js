import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import facebook from '../../public/facebook.svg'
import twitter from '../../public/twitter.svg'
import Title from '../../components/Title'
import Counter from '../../components/Counter'
import Footer from '../../components/Footer'
import SingleChoice from '../../components/SingleChoice'
import MajorityJugdment from '../../components/MajorityJugdment'
import Done from '../../components/Done'
import Form from '../../components/Form'
import BigArrowDown from '../../components/BigArrowDown'
import {candidates, grades} from '../../lib/constants'
import {shuffleArray} from '../../lib/utils'
import {useUser, getNumVotes, getNumParticipants} from '../../lib/database'


export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {round: 'premier'},
      },
      {
        params: {round: 'second'},
      },
    ],
    fallback: false,
  }
}


export async function getStaticProps({params}) {
  const {round} = params;

  const endingDate = Date.parse(process.env.DATE_ENDING);
  const remain = endingDate - new Date()
  const remainDays = Math.max(0, parseInt(remain / 3600 / 24 / 1000));
  const secondRoundCandidates = process.env.SECOND_ROUND_CANDIDATES.split(', ');
  const roundCandidates = candidates.filter(c => round == 'premier' || secondRoundCandidates.includes(c.name))
  return {
    props: {
      remain: remainDays,
      goalParticipants: process.env.GOAL_PARTICIPANTS,
      numParticipants: await getNumParticipants(),
      numVotes: await getNumVotes(),
      candidates: roundCandidates,
      round,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  }
}

// <div className="left menu">
//   <Link className="ui ensavoirplus" href='/'>
//     <div className='ui button secondary'>
//       <i className="left arrow icon"></i> Accueil
//     </div></Link>
// </div>

const Head = (props) => (
  <div className='head'>

    <div className="ui navigation">
      <a rel="noreferrer" target="_blank" href="https://www.facebook.com/mieuxvoter.fr" className='social'>
        <Image src={facebook} alt='facebook logo' />
      </a>
      <a rel="noreferrer" target="_blank" href="https://twitter.com/share?text=Sur%20mieuxvoter2022.fr%20vous%20pouvez%20enfin%20vous%20exprimer%20pour%20les%20présidentielles%20grâce%20au%20jugement%20majoritaire.%20Soyons%20les%20plus%20nombreux%20à%20participer%20à%20cette%20expérience%20pour%20peser%20dans%20le%20débat%20!&url=mieuxvoter2022.fr&hashtags=jugementmajoritaire,mieuxvoter" className='social'>
        <Image src={twitter} alt='twitter logo' />
      </a>
      <Link className="ui ensavoirplus " href='/'>
        <div className='ui tablet computer only grid'>
          <div className='ui button  secondary'>
            <i className="left arrow icon"></i>
            Accueil
          </div>
        </div>
      </Link>
      <div className='ui button secondary'>
        <Link className="ui ensavoirplus" href='/faq'>Questions fréquentes</Link>
      </div>
    </div>


    <div className="ui title">
      <Title />
      <h2 className='ui header subtitle'>Participez à l’expérience maintenant !</h2>

    </div>


  </div>
);

const Summary = (props) => {
  const numParticipantsK = props.numParticipants < 1000 ? '-' : parseInt(props.numParticipants / 1000);
  const numVotesK = props.numVotes < 1000 ? '-' : parseInt(props.numVotes / 1000);

  return (
    <div id='summary' className='ui container summary'>
      <div className="ui two column stackable grid">
        <div className="row">
          <div className='column'>
            <div className='left'>
              <h3 className='ui header'>Un système de vote pour révolutionner la démocratie</h3>
              <p>
                Exprimez enfin vos opinions sur tous les candidats ! Nous pouvons choisir différemment, nous devons changer le mode de scrutin !
              </p>
            </div>
          </div>
          <div className='column ballot'>
            <div className='right'>
              <Counter progress={props.numParticipants} total={props.goalParticipants} />
              <div className='stats'>
                <div className="ui two column grid">
                  <div className='column'>
                    <div className='redscore'>+{numVotesK}K</div>
                    <div className='legend'>votes</div>
                  </div>
                  <div className='column'>
                    <div className='redscore'>+{numParticipantsK}K</div>
                    <div className='legend'>participants</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
}


export default function Voter(props) {
  const defaultUser = {
    premier: {mj: false, sm: false, step: Math.random() > 0.5 ? 'mj' : 'sm', stepId: 1},
    second: {mj: false, sm: false, step: Math.random() > 0.5 ? 'mj' : 'sm', stepId: 1},
    round: props.round,
    info: false,
  };
  const {personalData, user, loading, setLoading, store, setPersonalData} = useUser(defaultUser);
  const [ballotCandidates, setBallotCandidates] = useState(props.candidates);
  const {round} = props;


  useEffect(() => {
    if (personalData && user && !loading) {
      console.log('Voter is ready')
      setBallotCandidates(
        old => {
          const newCandidates = [...old];
          shuffleArray(newCandidates);
          return newCandidates;
        }
      )
    }
  }, [personalData, loading, user])


  const handleSubmit = (step, ballotOrPersonal) => {
    if (loading) {
      return
    }
    setLoading(true);
    if (step == 'info') {
      setPersonalData(old => {
        const newData = {...old}
        newData[round].step = 'done';
        newData[round].stepId = old[round].stepId + 1;
        newData.info = ballotOrPersonal

        store(newData)

        return newData
      })
    } else if (step == 'done') {
      console.error('Submit on done?')
    } else {
      setPersonalData(old => {

        const newData = {...old}
        console.log('ROUND', round, step)
        newData[round][step] = ballotOrPersonal

        let nextStep = null;
        const after = old.info ? 'done' : 'info'
        const stepId = (old[round].mj != false) + (old[round].sm != false)
        if (step == 'mj') {
          nextStep = stepId == 2 ? after : 'sm'
        } else if (step == 'sm') {
          nextStep = stepId == 2 ? after : 'mj'
        } else {
          throw 'Unknown step'
        }

        newData[round].step = nextStep;
        newData[round].stepId = stepId + 1;

        store(newData)

        return newData
      })
    }
  }

  if (loading) {
    return (<div className='ui voter'>
      <Head {...props} />
      <Summary {...props} />
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Chargement</div>
      </div>
      <Footer />
    </div>)
  }

  let Component = null

  if (personalData[round].step == 'mj') {
    Component = MajorityJugdment
  }
  else if (personalData[round].step == 'sm') {
    Component = SingleChoice
  }
  else if (personalData[round].step == 'info') {
    Component = Form
  }
  else {
    Component = Done
  }

  return (
    <div className='ui voter'>
      <Head {...props} />
      <div style={{marginTop: "-7em", marginBottom: "5em"}} className='divider'>
        <BigArrowDown />
      </div>
      <Component {...personalData[round]} {...personalData.info} {...props} onSubmit={handleSubmit} candidates={ballotCandidates} grades={grades} />
      <Summary {...props} />
      <Footer />
    </div>
  )
}
