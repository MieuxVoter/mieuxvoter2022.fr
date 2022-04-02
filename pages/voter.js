import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'
import Title from '../components/Title'
import Calendar from '../components/Calendar'
import Counter from '../components/Counter'
import BigArrowDown from '../components/BigArrowDown'
import Footer from '../components/Footer'
import ScrutinUninominal from '../components/ScrutinUninominal'
import JugementMajoritaire from '../components/JugementMajoritaire'


export async function getStaticProps() {
  const endingDate = Date.parse(process.env.DATE_ENDING);
  const remain = endingDate - new Date()
  const remainDays = Math.max(0, parseInt(remain / 3600 / 24 / 1000));
  return {
    props: {
      remain: remainDays,
      goalParticipants: process.env.GOAL_PARTICIPANTS,
      numParticipants: process.env.NUM_PARTICIPANTS,
      numVotes: process.env.NUM_VOTES,
    }
  }
}

const Head = (props) => (
  <div className='home'>

    <div className="ui vertical masthead center aligned">

      <div className="ui container">

        <div className="ui top secondary menu">
          <div className="ui container">
            <div className="left menu">
              <Link className="ui ensavoirplus" href='/'>
                <div className='ui button secondary'>
                  <i className="left arrow icon"></i> Accueil
                </div></Link>
            </div><div className="right menu">
              <a rel="noopener" target="_blank" href="https://www.facebook.com/mieuxvoter.fr" className='social'>
                <Image src={facebook} alt='facebook logo' />
              </a>
              <a rel="noopener" target="_blank" href="twitter.com/mieux_voter" className='social'>
                <Image src={twitter} alt='twitter logo' />
              </a>
              <div className='ui button secondary'>
                <a className="ui ensavoirplus" href='/faq'>Questions fréquentes</a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="ui text container title">
        <Title />
        <h2 className='ui header subtitle'>Participez à l’expérience maintenant !</h2>

        <Link href='#summary'>
          <BigArrowDown />
        </Link>
      </div>

    </div>

    <div className='bottomright'>
      <Calendar remain={props.remain} />
    </div>
  </div>
);

const Summary = (props) => {
  const goalParticipantsK = parseInt(props.goalParticipants / 1000);

  return (
    <div id='summary' className='page'>
      <div className="ui two column grid">
        <div className='column content'>
          <h3 className='ui header'>Un système de vote pour révolutionner la démocratie</h3>
          <p>
            Exprimez enfin vos opinions sur tous les candidats et indiquons aux futurs décideurs ce que pensent vraiment les Français. Nous pouvons choisir différemment, nous devons changer le mode de scrutin !
          </p>
        </div>
        <div className='column stats'>
          <Counter progress={props.numParticipants} total={props.goalParticipants} />

        </div>
      </div>
    </div >
  );
}


export default function Voter(props) {
  // const [step, setStep] = useState(Math.random() > 0.5 ? 'jm' : 'sm');
  const [step, setStep] = useState('jm');


  return (
    <div>
      <Head {...props} />
      <Summary {...props} />
      {(step == 'jm') ? <JugementMajoritaire /> : <ScrutinUninominal />
      }
      <Footer />
    </div>
  )
}
