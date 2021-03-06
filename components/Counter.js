import Image from 'next/image'
import avatar from '../public/avatar.svg'
import {displayNumber} from '../lib/utils'

const Counter = ({progress, total}) => (<div className='counter'>
  <div className='row'>
    <div className='stat'>
      <span className='avatar'><Image src={avatar} alt='logo avatar' /></span>
      <span className='current'>{displayNumber(progress)}</span>
      <span className='participants'>participants</span>
    </div>
    <div className='progress'>
      {parseInt(progress / total * 100)}%
    </div>
  </div>
  <div className='row bar'>
    <div className='done' style={{width: `${progress / total * 100}%`}}>
    </div>
  </div>
</div>);

export default Counter;
