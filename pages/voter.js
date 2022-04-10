import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'
import Title from '../components/Title'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import SingleChoice from '../components/SingleChoice'
import MajorityJugdment from '../components/MajorityJugdment'
import Done from '../components/Done'
import Form from '../components/Form'
import BigArrowDown from '../components/BigArrowDown'
import {candidates, grades} from '../lib/constants'
import {shuffleArray} from '../lib/utils'
import {useUser, getNumVotes, getNumParticipants} from '../lib/database'


export async function getStaticProps() {
  const endingDate = Date.parse(process.env.DATE_ENDING);
  const remain = endingDate - new Date()
  const remainDays = Math.max(0, parseInt(remain / 3600 / 24 / 1000));
  return {
    props: {
      remain: remainDays,
      goalParticipants: process.env.GOAL_PARTICIPANTS,
      numParticipants: await getNumParticipants(),
      numVotes: await getNumVotes(),
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
  const defaultUser = {mj: false, sm: false, step: Math.random() > 0.5 ? 'mj' : 'sm', stepId: 0};
  const {personalData, user, userLoading, setPersonalData, storeBallot, error} = useUser(defaultUser);
  const [loading, setLoading] = useState(true);
  const ballotCandidates = [...candidates]
  shuffleArray(ballotCandidates)


  useEffect(() => {
    if (personalData && user && !userLoading) {
      setLoading(false);
    }
  }, [personalData, userLoading, user])

  if (loading) {
    return (<div className='ui voter'>
      <Head {...props} />
      <Summary {...props} />
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
      <Footer />
    </div>)
  }

  const handleSubmit = (ballotOrPersonal) => {
    if (personalData.step == 'info') {
      setPersonalData(old => ({...old, ...ballotOrPersonal, step: 'done'}))
      setLoading(true);
    } else if (personalData.step == 'mj') {
      const step = personalData.sm ? 'info' : 'sm'
      setPersonalData(old => ({...old, step, steId: old.stepId + 1}))
      storeBallot(ballotOrPersonal, personalData.step)
      setLoading(true);
    } else if (personalData.step == 'sm') {
      const step = personalData.mj ? 'info' : 'mj'
      setPersonalData(old => ({...old, step, steId: old.stepId + 1}))
      storeBallot(ballotOrPersonal, personalData.step)
      setLoading(true);
    }
  }

  let Component = null

  if (personalData.step == 'mj') {
    Component = MajorityJugdment
  }
  else if (personalData.step == 'sm') {
    Component = SingleChoice
  }
  else if (personalData.step == 'info') {
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
      <Component {...personalData} {...props} onSubmit={handleSubmit} candidates={ballotCandidates} grades={grades} />
      <Summary {...props} />
      <Footer />
    </div>
  )
}
