import './payment-processing.css'

/**
 * Full-screen liquid-glass splash shown while a payment is being authorised.
 * Purely presentational — the parent controls when it is mounted.
 */
export default function PaymentProcessing({ amount }) {
  return (
    <div className="pay-processing" role="status" aria-live="polite" aria-label="Processing payment">
      <div className="pay-processing__card">
        <div className="pay-processing__orb" aria-hidden="true">
          <span className="pay-processing__ring" />
          <span className="pay-processing__ring pay-processing__ring--slow" />
          <span className="pay-processing__chip">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
              <path d="M2.5 9.5h19" />
              <path d="M6 14.5h4" />
            </svg>
          </span>
        </div>
        <h2>Processing payment</h2>
        <p>Securely contacting your bank{amount ? ` for ${amount}` : ''}. This only takes a moment.</p>
        <div className="pay-processing__bar" aria-hidden="true"><span /></div>
        <span className="pay-processing__note">Encrypted · Do not close this window</span>
      </div>
    </div>
  )
}
