import Image from 'next/image'
import bigArrowDownImg from '../public/big-arrow-down.svg'

const BigArrowDown = () => (
  <div className='bigarrowdown'>
    <div className='arrow'>
      <Image src={bigArrowDownImg} alt='big arrow down' />
    </div>
  </div>

)

export default BigArrowDown;
