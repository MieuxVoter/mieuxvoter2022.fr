import Image from 'next/image'
const Modal = ({title, image, imageAlt, description, visible, onClose, actions}) => {

  return (
    <div className={`ui page ${visible ? "active" : ""} dimmer`}>
      <div className={`ui ${visible ? "active" : ""} modal`}>
        <div className="header">
          <i onClick={onClose} className="close icon"></i>
          {title ? title : ""}
        </div>
        <div className={`${image ? "image" : ""} content`}>
          {image ? (<div className="image">
            <Image src={image} alt={imageAlt} />
          </div>) : ""}
          {description ? (<div className="description">
            {description}
          </div>) : ""}
        </div>
        {
          actions ? (<div className="actions">
            {actions}
          </div>) : ""
        }
      </div>
    </div>
  )

}
export default Modal
