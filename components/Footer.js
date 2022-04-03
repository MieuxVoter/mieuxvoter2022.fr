import Link from 'next/link'
import Title from './Title'

const Footer = () => (
  <div className='footer'>
    <Title />

    <Link href='/voter'>
      <h5 className="ui big primary button padded">Je vote avec le jugement majoritaire <i className="right arrow icon"></i></h5>
    </Link>

    <div className='access'>
      <Link href='/faq'>
        <span className='item'>
          Questions fréquentes
        </span>
      </Link>
      <a rel="noopener" target="_blank" className='item' href='mailto:voterutile@mieuxvoter.fr'>
        Presse
      </a>
      <a rel="noopener" target="_blank" className='item' href='https://cnrs.fr'>
        CNRS
      </a>
      <a rel="noopener" target="_blank" className='item' href='https://dauphine.psl.eu'>
        Dauphine
      </a>
      <a rel="noopener" target="_blank" className='item' href='https://mieuxvoter.fr'>
        Mieux Voter
      </a>
    </div>


  </div >
)

export default Footer;
