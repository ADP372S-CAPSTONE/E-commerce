import { Link } from 'react-router-dom'
import AdminShell from '../../components/admin-shell/AdminShell.jsx'
import Loader from '../../components/loader/Loader.jsx'
import { paymentService } from '../../services/payments/paymentService.js'
import { useAsync } from '../../hooks/async/useAsync.js'
import { dateTime, label, money } from '../../utils/format/formatters.js'

const areas = [
  ['users', 'Customers & access', 'Activate or deactivate store accounts.'],
  ['products', 'Product catalogue', 'Create, edit and retire inventory.'],
  ['orders', 'Order operations', 'Move paid orders through fulfilment.'],
  ['payments', 'Payment ledger', 'Review transactions and issue refunds.'],
  ['deliveries', 'Delivery desk', 'Assign carriers and publish tracking.'],
  ['feedback', 'Feedback', 'Review and remove submitted feedback.'],
]

export default function AdminDashboard() {
  const { data: payments = [], loading } = useAsync(paymentService.all, [])
  const recent = [...(payments || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)

  return <AdminShell title="Operations dashboard">
    <div className="admin-grid">{areas.map(([path, title, copy], index) => <Link to={`/admin/${path}`} className="admin-tile" key={path}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p><b>Manage</b></Link>)}</div>

    <section className="admin-section">
      <div className="section__heading section__heading--flush"><h2>Recent payments</h2><Link to="/admin/payments">View all</Link></div>
      {loading
        ? <Loader />
        : recent.length
          ? <div className="table-wrap"><table>
              <thead><tr><th>Transaction</th><th>Order</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>{recent.map((p) => <tr key={p.transactionId}>
                <td><b>{p.transactionId}</b><small>{dateTime(p.createdAt)}</small></td>
                <td>{p.orderId}</td>
                <td>{money(p.capturedAmount)}</td>
                <td><span className={`status status--${p.paymentStatus.toLowerCase()}`}>{label(p.paymentStatus)}</span></td>
              </tr>)}</tbody>
            </table></div>
          : <p className="empty">No payments recorded yet.</p>}
    </section>
  </AdminShell>
}
