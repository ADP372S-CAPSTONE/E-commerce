import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader.jsx'
import Notice from '../../components/notice/Notice.jsx'
import { orderService } from '../../services/orders/orderService.js'
import { deliveryService } from '../../services/deliveries/deliveryService.js'
import { useAsync } from '../../hooks/async/useAsync.js'
import { dateTime, label, money } from '../../utils/format/formatters.js'

export default function OrderDetails() {
  const { orderId } = useParams(); const { data: order, setData, loading, error } = useAsync(() => orderService.get(orderId), [orderId]); const [message, setMessage] = useState('')
  const { data: tracking = [], loading: trackingLoading } = useAsync(() => deliveryService.trackOrder(orderId), [orderId])
  const cancel = async () => { try { setData(await orderService.cancel(orderId)); setMessage('Order cancelled.') } catch (err) { setMessage(err.message) } }
  if (loading) return <main className="page"><Loader /></main>
  if (!order) return <main className="page"><Notice message={error} /></main>
  const events = tracking || []
  return <main className="page"><header className="page-hero page-hero--small"><span className="eyebrow">Order {order.orderId}</span><h1>{label(order.orderStatus)}</h1><p>Placed {dateTime(order.createdAt)}</p></header><Notice message={message} type={message.includes('cancelled') ? 'success' : 'error'} /><div className="detail-grid"><section className="panel"><h2>Items</h2>{order.orderItems.map((item) => <div className="line-item" key={item.orderItemId}><img src={item.imageUrl || '/placeholder.svg'} alt="" /><span><b>{item.productName}</b><small>{item.quantity} × {money(item.unitPrice)}</small></span><strong>{money(item.lineTotal)}</strong></div>)}</section><aside className="summary"><h2>Total</h2><div><span>Basket</span><span>{money(order.financialBreakdown.basketSubtotal)}</span></div><div><span>VAT</span><span>{money(order.financialBreakdown.vatAmount)}</span></div><div><span>Delivery</span><span>{money(order.financialBreakdown.deliveryFee)}</span></div><div className="summary__total"><span>Total</span><strong>{money(order.financialBreakdown.finalInvoiceTotal)}</strong></div>{order.orderStatus === 'PENDING_PAYMENT' && <><Link className="button button--primary button--full" to={`/payment/${order.orderId}`} state={{ order }}>Pay now</Link><button className="link-button" onClick={cancel}>Cancel order</button></>}</aside><section className="panel"><h2>Delivery address</h2><p>{order.deliveryAddress.recipientName}<br />{order.deliveryAddress.streetAddress}<br />{order.deliveryAddress.suburb && `${order.deliveryAddress.suburb}, `}{order.deliveryAddress.city}<br />{order.deliveryAddress.province}, {order.deliveryAddress.postalCode}</p></section><section className="panel"><h2>Delivery tracking</h2>{trackingLoading ? <Loader /> : events.length ? <ol className="timeline">{events.map((event) => <li key={event.trackingId}><span /><div><b>{label(event.deliveryStatus)}</b><p>{event.statusMessage}</p><small>{event.currentLocation || 'Location unavailable'} · {dateTime(event.updateTimestamp)}</small></div></li>)}</ol> : <p className="empty">No delivery updates yet. Tracking will appear here once your order ships.</p>}</section></div></main>
}