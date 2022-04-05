import Image from 'next/image'
import Link from 'next/link'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'
import rightArrow from '../public/right-arrow.svg'
import pigArrow from '../public/pig-arrow.svg'
import researcher from '../public/research.svg'
import quote from '../public/quote.svg'
import labo from '../public/labo.svg'
import idea from '../public/idea.svg'
import vs from '../public/vs.svg'
import Title from '../components/Title'
import Calendar from '../components/Calendar'
import Counter from '../components/Counter'
import BigArrowDown from '../components/BigArrowDown'
import Footer from '../components/Footer'
import {getNumVotes, getNumParticipants} from '../lib/database'


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
    revalidate: 3600,
  }
}

const Head = (props) => (
  <div className='ui head'>

    <div className="ui navigation">
      <div className="right">
        <a rel="noreferrer" target="_blank" href="https://www.facebook.com/mieuxvoter.fr" className='social'>
          <Image src={facebook} alt='facebook logo' />
        </a>
        <a rel="noreferrer" target="_blank" href="twitter.com/mieux_voter" className='social'>
          <Image src={twitter} alt='twitter logo' />
        </a>
        <div className='ui button secondary'>
          <Link className="ui ensavoirplus" href='/faq'>Questions fréquentes</Link>
        </div>
      </div>

    </div>

    <Title />
    <h2 className='ui header subtitle'>Votez utile, pour la dernière fois !</h2>
    <div className='content'>
      Notre démocratie est malade de son mode de scrutin. Vote utile, vote contre, vote barrage, vote blanc : autant de symptômes d’un système qui dysfonctionne.  Ensemble démontrons que l’on peut refaire société différemment et  libérons les citoyens de ce carcan.
    </div>
    <div className='content'>
      Notre but : démontrer aux femmes et hommes politiques qu&apos;il est possible et nécessaire de révolutionner les élections avec le jugement majoritaire.
    </div>

    <Link href='/voter'>
      <div className="ui big blue primary down button">Participer à l’expérience <i className="right arrow icon"></i></div>
    </Link>

    <Link href='/faq'>
      <div className="ui tertiary blue down button">En savoir plus</div>
    </Link>



    <div className='bottomright'>
      <Calendar remain={props.remain} />
    </div>
  </div >
);


const Faq = () => (
  <div className='ui container faq'>
    <div className='advantages row'>
      <h3 className='ui header'>
        Qui organise cette expérience ?
      </h3>
      <p>
        Deux directeurs de recherche au CNRS et un doctorant à l’ENS/INRIA, l’un des organisateurs est aussi co-inventeur du jugement majoritaire.
      </p>


      <h3 className='ui header'>
        Pourquoi demandez-vous des informations personnelles ?
      </h3>
      <p>
        Afin de pouvoir interpréter correctement les résultats et en particulier les comparer avec les données d’une série de sondage qu’on a commandé à OpinionWay.
      </p>

      <h3 className='ui header'>
        Êtes-vous liés à un parti politique ?
      </h3>

      <p>
        Absolument pas. Nous sommes des scientifiques. Cependant, nous sommes aussi membres bénévoles de l’association Mieux Voter qui promeut le jugement majoritaire.
      </p>

      <h3 className='ui header'>
        Quel travail sera effectué à la fin de l&apos;expérience ?
      </h3>

      <p>
        Cette consultation viendra compléter une campagne de trois sondages OpinionWay visant à comprendre comment le recours au jugement majoritaire permettrait d&apos;améliorer les processus démocratiques (lutte contre le vote utile, l&apos;abstention, etc.).  L’expérience permettra aussi de familiariser les électeurs avec une innovation électorale et d’alimenter la recherche sur une science datant de la Révolution Française avec Borda et Condorcet.
      </p>

      <h3 className='ui header'>
        Vais-je vraiment aider à la recherche en contribuant au site ?
      </h3>

      <p>
        Les données récoltées seront analysées par les organisateurs puis mises à disposition de la communauté scientifique. Il est important de tester les nouveaux modes de scrutin dans différents environnements. Aussi, puisque le jugement majoritaire ambitionne d’être une alternative au scrutin uninominal, il est important que le grand public y soit familiarisé et y adhère.
      </p>

      <h3 className='ui header'>
        Comment puis-je davantage aider au développement du jugement majoritaire ?
      </h3>

      <p>
        En y participant au vote et en partageant avec votre entourage ou sur les réseaux sociaux. Vous pouvez aussi rejoindre les bénévoles de Mieux Voter.
      </p>

    </div>
  </div>
);


export default function Page(props) {
  return (
    <div>
      <Head {...props} />
      <div className='divider'>
        <BigArrowDown />
      </div>
      <Faq {...props} />
      <Footer />
    </div>
  )
}
