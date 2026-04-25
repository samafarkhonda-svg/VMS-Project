import { useNavigate } from "react-router-dom"

function Confirmation() {
  const navigate = useNavigate()

  return (
    <div className="signup-confirmation-container">
      <div className="text-align-left">
        <h1 className="margin-10">Sign-up Confirmation</h1>
        <p className="margin-10">
          You should have received a six-digit code via email. If you have not
          received the code yet, please wait up to five minutes before requesting
          a new code.
        </p>
        <p className="margin-10">Enter the code below:</p>
      </div>

      <input
        type="text"
        className="verification-code"
        id="verification-code"
        name="verificationCode"
        placeholder="000000"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        maxLength={6}
      />

      <button
        className="confirm-code"
        onClick={() => navigate("/events")}
      >
        Confirm
      </button>
    </div>
  )
}

export default Confirmation