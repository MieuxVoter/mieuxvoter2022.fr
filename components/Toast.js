

const ErrorToast = ({msg}) => (
  <div class="top right ui toast-container">
    <div class="toast-box transition visible">
      <div class="pink ui toast">
        <div class="content">
          <div>{msg}</div>
        </div>
      </div>
    </div>
  </div>
);


export default ErrorToast
