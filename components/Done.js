import Image from 'next/image'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'

const Done = ({goalParticipants}) => (<div className='ui container done'>
  <h2 className='ui header'>Merci de votre participation !</h2>
  <p>Nous voulons atteindre {goalParticipants} participants pour mettre en évidence sans ambiguité les différences entre le scrutin uninominal et le jugement majoritaire.</p>
  <p>Aidez nous à atteindre cet objectif en relayant l&apos;initiative sur les réseaux sociaux :</p>
  <div className='share'>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvoterutile.fr" target="_blank" rel="noreferrer">
      <Image className="" src={facebook} width="50px" height="50px" alt="Partager sur Facebook" />
    </a>
    <a href="http://twitter.com/share?text=Voter%20utile,%20pour%20la%20dernière%20fois%20!&url=https%3A%2F%2Fvoterutile.fr&hashtags=voterutile,presidentielle2050,mieuxvoter" target="_blank" rel="noreferrer">
      <Image className="" src={twitter} width="50px" height="50px" alt="Partager sur Twitter" />
    </a>
  </div>

</div>)

export default Done
