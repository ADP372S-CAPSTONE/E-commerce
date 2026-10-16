import AdminShell from '../../components/admin-shell/AdminShell.jsx'; import Loader from '../../components/loader/Loader.jsx'; import Notice from '../../components/notice/Notice.jsx'
import { paymentService } from '../../services/payments/paymentService.js'; import { useAsync } from '../../hooks/async/useAsync.js'; import { byRecent, dateTime, label, money } from '../../utils/format/formatters.js'

export default function AdminPayments() {
  const { data: payments = [], loading, error, reload } = useAsync(paymentService.all, [])
  const refund = async (id) => { if (confirm('Refund this payment and restore stock?')) { await paymentService.refund(id); reload() } }
  const rows = [...(payments || [])].sort(byRecent('createdAt', 'transactionId'))
  return <AdminShell title="Payments"><Notice message={error} />{loading ? <Loader /> : <div className="table-wrap"><table><thead><tr><th>Transaction</th><th>Order</th><th>Method</th><th>Amount</th><th>Status</th><th /></tr></thead><tbody>{rows.map((p) => <tr key={p.transactionId}><td><b>{p.transactionId}</b><small>{dateTime(p.createdAt)}</small></td><td>{p.orderId}</td><td>{p.paymentDescription}</td><td>{money(p.capturedAmount)}</td><td><span className={`status status--${p.paymentStatus.toLowerCase()}`}>{label(p.paymentStatus)}</span></td><td>{p.paymentStatus === 'SUCCESSFUL' && <button className="button button--ghost" onClick={() => refund(p.transactionId)}>Refund</button>}</td></tr>)}</tbody></table></div>}</AdminShell>
}