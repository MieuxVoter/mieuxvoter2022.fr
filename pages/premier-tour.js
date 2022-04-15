import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'
import Title from '../components/Title'
import Calendar from '../components/Calendar'
import BigArrowDown from '../components/BigArrowDown'
import Footer from '../components/Footer'
import {getNumVotes, getNumParticipants} from '../lib/database'
import MajorityJugdment from '../components/MajorityJugdment'
import MajorityJugdmentResult from '../components/MajorityJudgmentResult'
import SingleChoiceResult from '../components/SingleChoiceResult'
import {candidates} from '../lib/constants'

export async function getStaticProps() {
  const candidatesByName = {};
  candidates.forEach(c => candidatesByName[c.name] = c)

  const results = {
    'mj': [
      [candidatesByName["Jean-Luc Mélenchon"], [18.22, 22.57, 19.08, 12.22, 10.20, 6.18, 11.53]],
      [candidatesByName["Yannick Jadot"], [4.87, 12.09, 19.87, 20.19, 19.46, 14.13, 9.38]],
      [candidatesByName["Philippe Poutou"], [10.25, 10.89, 12.21, 12.43, 12.30, 18.63, 23.30]],
      [candidatesByName["Fabien Roussel"], [1.58, 4.75, 11.82, 18.39, 23.95, 23.35, 16.16]],
      [candidatesByName["Anne Hidalgo"], [1.06, 4.05, 10.16, 16.43, 25.06, 24.77, 18.47]],
      [candidatesByName["Nathalie Arthaud"], [1.32, 4.08, 9.52, 12.89, 16.36, 24.79, 31.04]],
      [candidatesByName["Emmanuel Macron"], [2.51, 5.15, 8.94, 10.27, 15.46, 16.87, 40.80]],
      [candidatesByName["Jean Lassalle"], [0.84, 1.66, 3.54, 6.65, 13.36, 30.83, 43.12]],
      [candidatesByName["Valérie Pecresse"], [0.46, 0.93, 2.83, 5.94, 15.72, 26.16, 47.95]],
      [candidatesByName["Nicolas Dupont-Aignan"], [0.48, 1.03, 1.59, 2.26, 5.02, 12.95, 76.66]],
      [candidatesByName["Marine Le Pen"], [0.83, 1.45, 2.23, 2.76, 4.69, 6.51, 81.53]],
      [candidatesByName["Eric Zemmour"], [1.86, 1.12, 1.15, 1.27, 1.94, 2.59, 90.08]],
    ],
    "sm": [
      [candidatesByName["Jean-Luc Mélenchon"], 55.5],
      [candidatesByName["Emmanuel Macron"], 14.4],
      [candidatesByName["Yannick Jadot"], 10.5],
      [candidatesByName["Philippe Poutou"], 5.0],
      [candidatesByName["Fabien Roussel"], 3.4],
      [candidatesByName["Eric Zemmour"], 2.8],
      [candidatesByName["Anne Hidalgo"], 2.4],
      [candidatesByName["Marine Le Pen"], 1.8],
      [candidatesByName["Jean Lassalle"], 1.7],
      [candidatesByName["Valérie Pecresse"], 1.4],
      [candidatesByName["Nicolas Dupont-Aignan"], 0.7],
      [candidatesByName["Nathalie Arthaud"], 0.5],
    ]
  }

  return {
    props: {
      numVotes: 27993,
      candidates: candidates,
      results: results,
    },
  }
}

const Selector = ({setMode, mode}) => (
  <div className='ui selector'>
    <div onClick={() => setMode('mj')} className={`ui rounded ${mode == 'mj' ? 'active' : ''} button`}>Jugement majoritaire</div>
    <div onClick={() => setMode('sm')} className={`ui rounded ${mode == 'sm' ? 'active' : ''} button`}>Scrutin uninominal</div>
  </div >
)

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
    <h2 className='ui header subtitle'>Les résultats du premier tour !</h2>

    <Selector {...props} />

  </div >
);



const Results = ({results, mode, numVotes}) => {
  if (mode == "mj") {
    return (<> {results[mode].map(([candidate, grades], i) => (
      <MajorityJugdmentResult key={i} name={candidate.name} image={candidate.photo} grades={grades} />))} </>

    )
  } else {
    return (
      <div
        style={{marginTop: "2em"}}
        className={`ui doubling stackable grid ${results.length == 2 ? 'two' : 'three'} column`}
      >
        {results[mode].map(([candidate, grade], i) => (
          <div key={i} className='column' >
            <SingleChoiceResult
              rank={i + 1}
              name={candidate.name}
              image={candidate.photo}
              grade={grade}
              numVotes={numVotes}
            />
          </div>))
        }
      </div>)
  }
}

export default function Page(props) {
  const [mode, setMode] = useState('mj');
  return (
    <div className='results'>
      <Head {...props} mode={mode} setMode={setMode} />
      <div className='ui container'>
        <div className='ui space'>
        </div>
        <Results {...props} mode={mode} />
        <div className='ui space'>
        </div>
        <div className='ui center'>
          <Link href='/voter/second'>
            <div className="ui big blue primary button">Participer au second tour <i className="right arrow icon"></i></div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

