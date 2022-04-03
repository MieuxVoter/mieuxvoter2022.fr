import {useState, Fragment} from 'react'

const Message({type, title, children}) => {
  const [display, setDisplay] = useState(true);

  if (!display) {
    return null;
  }

  return (<div class={`ui ${type} message`}>
    <i onClick={() => setDisplay(false)} class="close icon"></i>
    <div class="header">
      {title}
    </div>
    {children}
  </div >)
}

export default Message
