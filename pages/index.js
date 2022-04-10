import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'
import rightArrow from '../public/right-arrow.svg'
import pigArrow from '../public/pig-arrow.svg'
import ridaLaraki from '../public/rida-laraki.jpg'
import michelBalinski from '../public/balinski.jpg'
import davidChavalarias from '../public/david-chavalarias.jpg'
import pierrelouisGuhur from '../public/pierrelouis-guhur.jpg'
import quote from '../public/quote.svg'
import labo from '../public/labo.svg'
import idea from '../public/idea.svg'
import vs from '../public/vs.svg'
import Title from '../components/Title'
import Calendar from '../components/Calendar'
import Counter from '../components/Counter'
import BigArrowDown from '../components/BigArrowDown'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
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
      <a rel="noreferrer" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmieuxvoter2022.fr" className='social'>
        <Image src={facebook} alt='facebook logo' />
      </a>
      <a className="social" href="https://twitter.com/share?text=Sur%20mieuxvoter2022.fr%20vous%20pouvez%20enfin%20vous%20exprimer%20pour%20les%20présidentielles%20grâce%20au%20jugement%20majoritaire.%20Soyons%20les%20plus%20nombreux%20à%20participer%20à%20cette%20expérience%20pour%20peser%20dans%20le%20débat%20!" target="_blank" rel="noreferrer">
        <Image src={twitter} alt='twitter logo' />
      </a>
      <div className='ui button secondary'>
        <Link className="ui ensavoirplus" href='/faq'>Questions fréquentes</Link>
      </div>
    </div>

    <Title />
    <h2 className='ui header subtitle'>Votez utile, pour la dernière fois !</h2>
    <div className='content'>
      Notre démocratie est malade de son mode de scrutin. Vote utile, vote contre, vote barrage, vote blanc : autant de symptômes d’un système qui dysfonctionne. La recherche Française a conçu un nouveau mode de scrutin, le jugement majoritaire, qui ouvre la voie vers une vie démocratique plus saine.
    </div>
    <div className='content'>
      <b>Notre but :</b> expérimenter massivement ce nouveau système de vote et ouvrir un débat sur une réforme électorale et les nouveaux modes de scrutins.
    </div>

    <Link href='/voter'>
      <div className="ui big blue primary  button">Participer à l’expérience <i className="right arrow icon"></i></div>
    </Link>

    <Link href='/faq'>
      <div className="ui tertiary blue  button">En savoir plus</div>
    </Link>

    <div className='bottomright'>
      <Calendar remain={props.remain} />
    </div>
  </div >
);

const Chrono = (props) => {
  const goalParticipantsK = parseInt(props.goalParticipants / 1000);

  return (
    <div id='chrono' className='ui container'>
      <div className="ui two column stackable grid">
        <div className='right-arrow-1'>
          <div className='ui computer only grid'>
            <Image src={rightArrow} />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className=" card-chrono">
              <h4 className='ui header'>01</h4>
              <h3 className='ui header'>Un système de vote pour réparer la démocratie</h3>
              <p>Au lieu de ne pouvoir choisir qu&apos;un seul candidat, ce qui ne dit rien sur ce que vous pensez des autres ni du candidat lui même, exprimez vous sur tous les candidats sur une échelle de mentions de « Excellent » à « À rejeter ». Le candidat le mieux évalué par une majorité l&apos;emporte.</p>
            </div>
          </div>
          <div className="column">
            <div className=" card-chrono">
              <h4 className='ui header'>02</h4>
              <h3 className='ui header'>Pesons dans le débat en atteignant {goalParticipantsK}K participants !</h3>
              <Counter progress={props.numParticipants} total={props.goalParticipants} />
              <Link href='/voter'>
                <div className="ui big primary fluid button">Je participe à la recherche  <i className="right arrow icon"></i></div>
              </Link>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="pig-arrow">
            <div className='ui computer only grid'>
              <Image src={pigArrow} />
            </div>
          </div>
        </div>
        <div className='right-arrow-2'>
          <div className='ui computer only grid'>
            <Image src={rightArrow} />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className=" card-chrono">
              <h4 className='ui header'>03</h4>
              <Image src={labo} alt='labo' />
              <h3 className='ui header'>Analyse des résultats par les chercheurs du CNRS</h3>
            </div>
          </div>
          <div className="column">
            <div className=" card-chrono">
              <h4 className='ui header'>04</h4>
              <Image src={idea} alt='idea' />
              <h3 className='ui header'>Il n’y a pas de fatalité, on peut réformer la présidentielle</h3>
            </div>
          </div>
        </div>
      </div>

      <Link href='/faq'>
        <div className='calltoaction'>
          <div className="ui big primary red button">Voir le détail de l’étude</div>
        </div>
      </Link>


    </div>
  )
}


// <div className='ui stackable two column grid'>
//   <div className='ui column'>
//     {parseInt(numVotes / 1000)}K</div>
//   <div className='votes'>VOTES</div>
// </div>
// <div className='ui column'>
//   {parseInt(numParticipants / 1000)}K</div>
// <div className='votes'>PARTICIPANTS</div>
// </div >
const NumBallots = ({numVotes, numParticipants}) => {
  const [visible, setVisible] = useState(false);
  const description = (<>
    <p>Soyons les plus nombreux à plebisciter une autre manière de voter</p>
  </>)
  const actions = (
    <>
      <Link href='/voter'>
        <div className="ui  primary button">Je participe   <i className="right arrow icon"></i></div>
      </Link>
      <a href="https://www.facebook.com/sharer/sharer.php?u=mieuxvoter2022.fr" target="_blank" rel="noreferrer">
        <div className="ui labeled icon button">
          <i className=" arrow facebook icon"></i>
          Facebook
        </div>
      </a>
      <a href="https://twitter.com/share?text=Sur%20mieuxvoter2022.fr%20vous%20pouvez%20enfin%20vous%20exprimer%20pour%20les%20présidentielles%20grâce%20au%20jugement%20majoritaire.%20Soyons%20les%20plus%20nombreux%20à%20participer%20à%20cette%20expérience%20pour%20peser%20dans%20le%20débat%20!&url=https%3A%2F%mieuxvoter2022.fr&hashtags=jugementmajoritaire,mieuxvoter" target="_blank" rel="noreferrer">
        <div className="ui labeled icon button">
          <i className=" arrow twitter icon"></i>
          Twitter
        </div>
      </a>
    </>);
  return (
    <>
      <Modal
        title="Je partage"
        visible={visible}
        onClose={() => setVisible(false)}
        description={description}
        actions={actions}
      />
      < div className='ui container' >
        <div className='ui grid computer only'>
          <div className='num-ballots '>
            <h2 className='ui header subtitle'>Déjà, plus de</h2>
            <div className='num-votes'>
              {parseInt(numParticipants / 1000)}K</div>
            <div className='votes'>PARTICIPANTS</div>
            <div className='overlap'>
              <div className="ui big primary button" onClick={() => setVisible(true)}>Je partage l&apos;expérience <i className="right arrow icon"></i></div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

// <li>Un candidat rejeté par la majorité des votants ne peut jamais être élu.</li>
const Versus = () => (
  <div className='ui container'>
    <div className='versus row'>
      <div className="ui two column stackable grid">
        <div className='ui seven wide column'>
          <h3 className='ui header'>Vote au jugement majoritaire</h3>
          <ul>
            <li>J’évalue tous les candidats sur une échelle de mentions de « Excellent » à « À rejeter ».</li>
            <li>Je peux mettre la même mention à plusieurs candidats.</li>
            <li>Tous mes jugements sont pris en compte dans le classement final des candidats.</li>
          </ul>
        </div>
        <div className='ui two wide column'>
          <div className='vs'>
            <div>
              <Image src={vs} />
            </div>
          </div>
        </div>
        <div className='ui seven wide column'>
          <h3 className='ui header'>Vote au scrutin uni-nominal</h3>
          <ul>
            <li>
              Je n’ai qu’une seule voix qui ne dit rien du candidat pour qui je vote (vote barrage, vote utile, etc.)
            </li>
            <li>Ce que je pense des candidats pour qui je n’ai pas voté n’est pas pris en compte</li>
            <li>Un candidat rejeté par une majorité des Français peut quand même être élu.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Advantages = () => (
  <div className='ui container'>
    <div className='advantages row'>
      <div className="ui three column stackable grid">
        <div className='column'>
          <h2 className='ui header'>Fin du vote utile</h2>
          <p>Le vote utile disparait puisque l’on peut évaluer positivement plusieurs candidats.</p>
        </div>
        <div className='column'>
          <h2 className='ui header'>Le vote vous appartient</h2>
          <p>Adhésions et rejets sont pris en compte et influent sur l’évaluation finale.</p>
        </div>
        <div className='column'>
          <h2 className='ui header'>Pas besoin de stratégie</h2>
          <p>
            Les voix ne se dispersent plus, diviser le camp adverse ne permet plus de l’emporter.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Quotes = () => {
  const quotes = [
    {
      'author': 'Rida Laraki',
      'quote': 'Le scrutin majoritaire fait l’unanimité des chercheurs contre lui depuis la révolution française et les travaux fondateurs de Condorcet et de Borda.  Suite à l’accident démocratique de 2002, le jugement majoritaire a été conçu avec mon collègue Michel Balinski pour réparer les déboires du scrutin majoritaire et améliorer profondément les règles du jeu démocratique.',
      'image': ridaLaraki
    },
    {
      'author': 'David Chavalarias',
      'quote': 'Arrêtons de voter pour le moins pire, évaluons la capacité des candidats à porter les bonnes idées. Le jugement majoritaire permet enfin de voter par conviction en redonnant sens au vote.',
      'image': davidChavalarias
    },
    {
      'author': 'Michel Balinski',
      'quote': 'Les démocraties sont à la peine en France, en Europe, aux États-Unis. Les électeurs protestent. L’une des causes principales de ce malaise provient du système électoral. Il empêche les électeurs de s’exprimer et porte souvent au pouvoir des candidats non voulus. En France, des primaires – à droite, à gauche ou citoyennes – cherchent à éviter le pire […]. Des primaires avec le scrutin majoritaire sont une fausse piste. Remplacer le mode de scrutin actuel par le jugement majoritaire s’impose.',
      'image': michelBalinski
    },
    {
      'author': 'Pierre-Louis Guhur',
      'quote': "A cause de notre mode de scrutin et de ses stratégies de vote, toute l'attention est portée sur quelques candidats. Les autres candidats, qui sont parfois les seuls à représenter des minorités sont complètement oubliés. Ce n'est pas sans raison que les jeunes se désintéressent des élections, alors que nous avons plein d'idées et convictions.",
      'image': pierrelouisGuhur
    },
  ]


  const [randQuote, setQuote] = useState(quotes[0]);
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className='row quotes'>
      <div className="ui two column stackable grid">
        <div className='column img'>
          <Image src={randQuote.image} alt={randQuote.author} />
        </div>
        <div className='column'>
          <Image src={quote} alt='Quote' />
          <div className='quote'>{randQuote.quote}</div>
          <div className='author'>{randQuote.author}</div>
        </div>
      </div>
    </div>
  )
}

export default function Home(props) {
  return (
    <div className='home'>
      <Head {...props} />
      <Link href='#chrono'>
        <div className='divider'>
          <BigArrowDown />
        </div>
      </Link>
      <Chrono {...props} />
      <NumBallots {...props} />
      <BigArrowDown />
      <Versus {...props} />
      <BigArrowDown />
      <Advantages {...props} />
      <Link href='/voter'>
        <div className='calltoaction'>
          <div className="ui big primary button">Participer au vote <i className="right arrow icon"></i></div>
        </div>
      </Link>
      <BigArrowDown />
      <Quotes />
      <Footer />
    </div>
  )
}
