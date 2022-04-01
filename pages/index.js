import Title from '../components/Title'

export default function Home() {
  return (
    <div>

      <div className="home">
        <div className="ui inverted vertical masthead center aligned segment">

          <div className="ui container">

            <div className="ui top secondary menu">
              <div className="ui container">
                <div className="right menu">
                  <a href="https://www.facebook.com/mieuxvoter.fr">
                    <i className="facebook icon"></i>
                  </a>
                  <a href="twitter.com/mieux_voter">
                    <i className="twitter icon"></i>
                  </a>
                  <a className="ui button">En savoir plus</a>
                </div>
              </div>
            </div>

          </div>

          <div className="ui text container">
            <Title />
            <h2 className='ui header'>Votez utile pour la dernière fois !</h2>
            <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
          </div>

        </div>






      </div>
    </div >
  )
}
