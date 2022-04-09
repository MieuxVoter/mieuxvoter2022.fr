import Image from 'next/image'
import Link from 'next/link'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'
import Title from '../components/Title'
import Calendar from '../components/Calendar'
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
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  }
}

const Head = (props) => (
  <div className='ui head'>

    <div className="ui navigation">
      <a rel="noreferrer" target="_blank" href="https://www.facebook.com/mieuxvoter.fr" className='social'>
        <Image src={facebook} alt='facebook logo' />
      </a>
      <a className="social" href="https://twitter.com/share?text=Sur%20mieuxvoter2022.fr%20vous%20pouvez%20enfin%20vous%20exprimer%20pour%20les%20présidentiels%20grâce%20au%20jugement%20majoritaire.%20Soyons%20les%20plus%20nombreux%20à%20participer%20à%20cette%20expérience%20pour%20peser%20dans%20le%20débat%20!" target="_blank" rel="noreferrer">
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

    <Title />
    <h2 className='ui header subtitle'>Votez utile, pour la dernière fois !</h2>
    <div className='content'>
      Notre démocratie est malade de son mode de scrutin. Vote utile, vote contre, vote barrage, vote blanc : autant de symptômes d’un système qui dysfonctionne. La recherche Française a conçu un nouveau mode de scrutin, le jugement majoritaire, qui libère la société de ce carcan et ouvre la voie vers une vie démocratique plus saine.
    </div>
    <div className='content'>
      Notre but : expérimenter massivement ce nouveau système de vote et exhorter la ou le prochain locataire de l&apos;Elysée à ouvrir un débat sur une réforme électorale et les nouveaux modes de scrutins.
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


const Faq = ({videos}) => (
  <div className='ui container faq'>
    <div className='advantages row'>

      <h3 className='ui header'>
        Pouvez-vous m&apos;expliquer le fonctionnement du jugement majoritaire ?
      </h3>

      <p>
        Avec plaisir ! Vous trouverez de nombreuses informations sur le <a href='https://mieuxvoter.fr/' rel='noreferrer' target='_blank'>site de Mieux Voter</a> (dont les <a href='https://mieuxvoter.fr/faq' rel='noreferrer' target='_blank'>questions fréquentes</a>). En particulier, Mieux Voter a produit plusieurs vidéos accessibles sur sa chaine <a href='https://www.youtube.com/channel/UCNnvjrbesSdju53YX7ijtyQ' rel='noreferrer' target='_blank'>YouTube</a>.

      </p>
      <h3 className='ui header'>
        Qui organise cette expérience ?
      </h3>
      <p>
        L&apos;association Mieux Voter en partenariat avec le CNRS et Dauphine. Deux directeurs de recherche au CNRS et un doctorant à l’ENS/Inria coordonnent l&apos;opération. L’un des organisateurs est aussi co-inventeur du jugement majoritaire.
      </p>

      <h3 className='ui header'>
        Pourquoi demandez-vous des informations personnelles ?
      </h3>
      <p>
        Ces informations, qui préservent l&apos;anonymat, nous permettront d&apos;interpréter correctement les résultats et en particulier de les comparer avec les données d’une série de sondages que nous avons commandés à OpinionWay. En étudiant les résultats au sein d&apos;une même cohorte, nous pourrons par ailleurs mieux comprendre les effets de variables socio-démographiques telles que l&apos;âge ou la localisation géographique sur le vote.
      </p>

      <h3 className='ui header'>
        Êtes-vous liés à un parti politique ?
      </h3>

      <p>
        Absolument pas. Nous sommes des scientifiques. Cependant, nous sommes aussi membres bénévoles de l’association Mieux Voter qui promeut le jugement majoritaire de manière transpartisane.
      </p>

      <h3 className='ui header'>
        Quel travail sera effectué à la fin de l&apos;expérience ?
      </h3>

      <p>
        Cette consultation viendra compléter une campagne de trois sondages OpinionWay visant à comprendre comment le recours au jugement majoritaire permettrait d&apos;améliorer les processus démocratiques (lutte contre le vote utile, l&apos;abstention, etc.).  L’expérience permettra aussi de mieux comprendre comment les électeurs peuvent s&apos;approprier une innovation électorale et d’alimenter la recherche sur une science datant de la Révolution Française avec Borda et Condorcet.
      </p>

      <h3 className='ui header'>
        Vais-je vraiment aider à la recherche en contribuant au site ?
      </h3>

      <p>
        Les données récoltées seront analysées de manière anonyme par les organisateurs puis mises à disposition de la communauté scientifique. Il est important de tester les nouveaux modes de scrutin dans différents environnements. Aussi, puisque le jugement majoritaire ambitionne d’être une alternative au scrutin uninominal, il est important que le grand public l&apos;expérimente et puisse le comparer avec d&apos;autres expériences de vote.
      </p>

      <h3 className='ui header'>
        Comment puis-je davantage aider au développement du jugement majoritaire ?
      </h3>

      <p>
        En participant au vote et en partageant cette expérience avec votre entourage ou sur les réseaux sociaux. Vous pouvez aussi rejoindre les bénévoles de Mieux Voter.
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
