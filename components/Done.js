import Image from 'next/image'
import facebook from '../public/facebook.svg'
import twitter from '../public/twitter.svg'

const Done = ({goalParticipants}) => (<div className='ui container done'>
  <h2 className='ui header'>Merci de votre participation !</h2>
  <p>Nous voulons atteindre {goalParticipants} participants pour mettre en évidence sans ambiguïté les différences entre le scrutin uninominal et le jugement majoritaire.</p>
  <p>Aidez nous à atteindre cet objectif en relayant l&apos;initiative sur les réseaux sociaux :</p>
  <div className='share'>
    <a href="https://www.facebook.com/sharer/sharer.php?u=mieuxvoter2022.fr" target="_blank" rel="noreferrer">
      <Image className="" src={facebook} width="50px" height="50px" alt="Partager sur Facebook" />
    </a>
    <a href="https://twitter.com/share?text=Sur%20mieuxvoter2022.fr%20vous%20pouvez%20enfin%20vous%20exprimer%20pour%20les%20présidentielles%20grâce%20au%20jugement%20majoritaire.%20Soyons%20les%20plus%20nombreux%20à%20participer%20à%20cette%20expérience%20pour%20peser%20dans%20le%20débat%20!&url=https%3A%2F%mieuxvoter2022.fr&hashtags=jugementmajoritaire,mieuxvoter" target="_blank" rel="noreferrer">
      <Image className="" src={twitter} width="50px" height="50px" alt="Partager sur Twitter" />
    </a>
  </div>

</div>)

export default Done
