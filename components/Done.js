import Image from 'next/image'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'

const Done = ({goalParticipants}) => (<div className='ui container'>
  <h2>Merci de votre participation !</h2>
  <p>Nous voulons atteindre {goalParticipants} participants pour mettre en évidence sans ambiguité les différences entre le scrutin uninominal et le jugement majoritaire.</p>
  <p>Aidez nous à atteindre cet objectif en relayant l'initiative sur les réseaux sociaux :</p>
  <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvoterutile.fr" target="_blank" rel="noopener">
    <Image className="" src={facebook} width="22px" height="22px" alt="Partager sur Facebook" />
  </a>
  <a href="http://twitter.com/share?text=Voter%20utile,%20pour%20la%20dernière%20fois%20!&url=https%3A%2F%2Fvoterutile.fr&hashtags=voterutile,presidentielle2022,mieuxvoter" target="_blank" rel="noopener">
    <Image className="" src={twitter} width="22px" height="22px" alt="Partager sur Twitter" />
  </a>

</div>)

export default Done
