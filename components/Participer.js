import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import demoSM from '../public/demo-sm.svg'
import demoMJ from '../public/demo-mj.svg'
import Modal from './Modal'


const Participer = ({title, className}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div onClick={() => setVisible(false)} className={`ui ${visible ? "active" : ""}  inverted dimmer page`}>
        <div className="ui participer">

          <div className="ui computer tablet only two column stackable grid top">
            <div className="ui column">
              <h3 className="ui header">Jugement Majoritaire</h3>
              <Image src={demoMJ} alt="Exemple bulletin jm" />
            </div>
            <div className="ui column">
              <h3 className="ui header">Scrutin uninominal</h3>
              <Image src={demoSM} alt="Exemple bulletin sm" />
            </div>
          </div>

          <div className="bottom">
            <h2 className="ui header">Cadre de l&apos;étude</h2>
            <p>
              Vous êtes amené·e à vous prononcer anonynement sur les candidats à l&apos;élection présidentielle selon deux modes de scrutin différents : le scrutin
              uninominal majoritaire et le scrutin par jugement majoritaire.
            </p>
            <p>En indiquant vos intentions de vote, vous acceptez qu&apos;elles soient traitées de manière anonyme à des fins scientifiques.</p>
            <Link href='/voter'>
              <div className="ui big primary button">J&apos;ai compris   <i className="right arrow icon"></i></div>
            </Link>
          </div>

        </div>
      </div>

      <div onClick={() => setVisible(true)} className={`ui ${className} primary button`}>{title ? title : "Participer"}   <i className="right arrow icon"></i></div>
    </>
  )
}


export default Participer
