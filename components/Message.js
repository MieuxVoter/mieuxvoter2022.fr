import {useState, Fragment} from 'react'

const Message = ({type, title, children}) => {
  const [display, setDisplay] = useState(true);

  if (!display) {
    return null;
  }

  return (<div className={`ui ${type} message`}>
    <i onClick={() => setDisplay(false)} className="close icon"></i>
    <div className="header">
      {title}
    </div>
    {children}
  </div >)
}

export default Message
