export default function Notice({ message, type = 'error' }) {
  return message ? <div className={`notice notice--${type}`} role="alert">{message}</div> : null
}