import Link from 'next/link'
import Image from 'next/image'
import Title from './Title'
import mieuxvoter from '../public/mieuxvoter.svg'
import cnrs from '../public/cnrs.svg'
import dauphine from '../public/dauphine.svg'

const Footer = () => (
  <div className='footer'>
    <div className='inverted'>
      <Title />
    </div>

    <div className='ui grid tablet computer only'>
      <Link href='/voter' passHref>
        <h5 className="ui big primary button padded">Je vote avec le jugement majoritaire <i className="right arrow icon"></i></h5>
      </Link>
    </div>

    <div className='ui grid mobile only'>
      <Link href='/voter' passHref>
        <h5 className="ui big primary button padded">Je participe <i className="right arrow icon"></i></h5>
      </Link>
    </div>
    <div className='access'>
      <Link href='/faq' passHref>
        <span className='item pointer'>
          Questions fréquentes
        </span>
      </Link>
      <a rel="noreferrer" target="_blank" className='item' href='mailto:pierre-louis.guhur@mieuxvoter.fr'>
        Contact
      </a>
    </div>
    <div className='logos'>
      <a rel="noreferrer" target="_blank" className='item' href='https://cnrs.fr'>
        <Image src={cnrs} alt='logo cnrs' />
      </a>
      <a rel="noreferrer" target="_blank" className='item' href='https://dauphine.psl.eu'>
        <Image src={dauphine} alt='logo dauphine' height={50} width={50} />
      </a>
      <a rel="noreferrer" target="_blank" className='item' href='https://mieuxvoter.fr'>
        <Image src={mieuxvoter} alt='logo mieux voter' height={50} width={100} />
      </a>


    </div >
  </div >
)

export default Footer;
