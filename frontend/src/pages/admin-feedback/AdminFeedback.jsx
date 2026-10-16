import AdminShell from '../../components/admin-shell/AdminShell.jsx'; import Loader from '../../components/loader/Loader.jsx'; import Notice from '../../components/notice/Notice.jsx'
import { feedbackService } from '../../services/feedback/feedbackService.js'; import { useAsync } from '../../hooks/async/useAsync.js'; import { byRecent, dateTime, personName } from '../../utils/format/formatters.js'

export default function AdminFeedback() {
  const { data: feedback = [], loading, error, reload } = useAsync(feedbackService.all, [])
  const remove = async (id) => { if (confirm('Delete this feedback?')) { await feedbackService.remove(id); reload() } }
  const rows = [...(feedback || [])].sort(byRecent('dateSubmitted', 'feedbackId'))
  return <AdminShell title="Feedback">
    <Notice message={error} />
    {loading ? <Loader /> : rows.length ? <div className="data-list">{rows.map((item) => {
      const name = personName(item.customer, 'Verified customer')
      const rating = item.hardwareStarRating ?? item.courierFulfillmentRating
      const text = item.comprehensiveReviewText || item.packageConditionFeedback || 'No comment provided.'
      return <article className="feedback-card" key={item.feedbackId}>
        <span className="feedback-card__avatar" aria-hidden="true">{(name[0] || 'C').toUpperCase()}</span>
        <div className="feedback-card__body">
          <div className="feedback-card__who"><b>{name}</b>{rating != null && <span className="stars">{'★★★★★'.slice(0, rating)}{'☆☆☆☆☆'.slice(0, 5 - rating)}</span>}</div>
          <p>{text}</p>
          <small>{item.feedbackId} · {dateTime(item.dateSubmitted)}</small>
        </div>
        <button className="button button--danger" onClick={() => remove(item.feedbackId)}>Delete</button>
      </article>
    })}</div> : <p className="empty">No feedback submitted yet.</p>}
  </AdminShell>
}
