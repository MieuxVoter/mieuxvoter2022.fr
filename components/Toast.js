

const ErrorToast = ({msg}) => (
  <div className="top right ui toast-container">
    <div className="toast-box transition visible">
      <div className="pink ui toast">
        <div className="content">
          <div>{msg}</div>
        </div>
      </div>
    </div>
  </div>
);


export default ErrorToast
