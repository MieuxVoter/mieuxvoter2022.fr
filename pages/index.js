import Image from 'next/image'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'
import Title from '../components/Title'

export default function Home() {
  return (
    <div className='home'>

      <div className="ui vertical masthead center aligned segment ">

        <div className="ui container">

          <div className="ui top secondary menu">
            <div className="ui container">
              <div className="right menu">
                <a href="https://www.facebook.com/mieuxvoter.fr" className='social'>
                  <Image src={facebook} alt='facebook logo' />
                </a>
                <a href="twitter.com/mieux_voter" className='social'>
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
          <h2 className='ui header subtitle'>Votez utile pour la dernière fois !</h2>
          <p>La plupart des partis recherchent à rallier les électeurs derrière leur candidat avant d'avoir un programme. Nous faisons la démarche inverse. Nous commençons par le programme et vous présenterons le ou la candidate la plus à même de le porter dans quelques semaines.
          </p>
          <div className="ui huge primary button">Participer au vote <i className="right arrow icon"></i></div>
        </div>

      </div>





    </div>
  )
}
