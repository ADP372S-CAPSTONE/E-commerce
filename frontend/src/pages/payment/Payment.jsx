import { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Notice from '../../components/notice/Notice.jsx'
import VirtualCard from '../../components/virtual-card/VirtualCard.jsx'
import CheckoutSteps from '../../components/checkout-steps/CheckoutSteps.jsx'
import OrderConfirmation from '../../components/order-confirmation/OrderConfirmation.jsx'
import PaymentProcessing from '../../components/payment-processing/PaymentProcessing.jsx'
import { paymentService } from '../../services/payments/paymentService.js'
import { orderService } from '../../services/orders/orderService.js'
import { cardBrands, walletProviders } from '../../constants/catalog/catalogOptions.js'
import { label, money } from '../../utils/format/formatters.js'

const emptyBilling = { billingName: '', streetAddress: '', suburb: '', city: '', province: '', postalCode: '', country: 'South Africa' }
const fromDelivery = (d) => d ? { billingName: d.recipientName || '', streetAddress: d.streetAddress || '', suburb: d.suburb || '', city: d.city || '', province: d.province || '', postalCode: d.postalCode || '', country: d.country || 'South Africa' } : { ...emptyBilling }

export default function Payment() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(useLocation().state?.order || null)
  const [method, setMethod] = useState('CARD')
  const [card, setCard] = useState({ paymentToken: '', cardBrand: 'VISA', cardholderName: '', cardLastFourDigits: '' })
  const [wallet, setWallet] = useState({ walletProvider: 'PAYPAL', walletToken: '' })
  const [billing, setBilling] = useState(emptyBilling)
  const [sameAsDelivery, setSameAsDelivery] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  // Recover the order on refresh (navigation state is lost) and keep billing in
  // sync with the delivery address the customer already captured at checkout.
  useEffect(() => {
    let active = true
    const apply = (data) => { if (!active || !data) return; setOrder(data); setBilling(fromDelivery(data.deliveryAddress)) }
    if (order) { setBilling(fromDelivery(order.deliveryAddress)); return () => { active = false } }
    orderService.get(orderId).then(apply).catch(() => {})
    return () => { active = false }
  }, [orderId])

  const breakdown = order?.financialBreakdown
  const total = breakdown?.finalInvoiceTotal
  const delivery = order?.deliveryAddress

  const effectiveBilling = useMemo(
    () => (sameAsDelivery && delivery) ? fromDelivery(delivery) : billing,
    [sameAsDelivery, delivery, billing],
  )

  const changeCard = (e) => setCard({ ...card, [e.target.name]: e.target.value })
  const changeBilling = (e) => setBilling({ ...billing, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('')
    const startedAt = Date.now()
    // Keep the processing splash on screen long enough to read, even on a fast gateway.
    const settle = async () => { const elapsed = Date.now() - startedAt; if (elapsed < 1400) await new Promise((r) => setTimeout(r, 1400 - elapsed)) }
    try {
      const result = method === 'CARD'
        ? await paymentService.payCard({ orderId, paymentToken: card.paymentToken, cardBrand: card.cardBrand, cardholderName: card.cardholderName, cardLastFourDigits: card.cardLastFourDigits, billingLocation: effectiveBilling })
        : await paymentService.payWallet({ orderId, walletProvider: wallet.walletProvider, walletToken: wallet.walletToken, billingLocation: effectiveBilling })
      await settle()
      if (result.paymentStatus === 'SUCCESSFUL') setConfirmed(true)
      else setError(result.failureReason || 'Payment was declined')
    } catch (err) { await settle(); setError(err.message) } finally { setBusy(false) }
  }

  if (confirmed && order) {
    return <main className="page payment-page">
      <header className="page-hero page-hero--small page-hero--flow"><span className="eyebrow">Order confirmed</span><h1>All done</h1></header>
      <OrderConfirmation order={order} />
    </main>
  }

  return <main className="page payment-page">
    {busy && <PaymentProcessing amount={total != null ? money(total) : ''} />}
    <header className="page-hero page-hero--small page-hero--flow"><span className="eyebrow">Final step</span><h1>Payment {total != null && <small>{money(total)}</small>}</h1></header>
    <CheckoutSteps current={3} />
    <Notice message={error} />
    <div className="payment-layout">
      <form className="form panel payment-form" onSubmit={submit}>
        <div className="tabs">
          <button type="button" className={method === 'CARD' ? 'active' : ''} onClick={() => setMethod('CARD')}>Card</button>
          <button type="button" className={method === 'WALLET' ? 'active' : ''} onClick={() => setMethod('WALLET')}>Digital wallet</button>
        </div>

        {method === 'CARD'
          ? <div className="pay-method">
              <VirtualCard brand={card.cardBrand} last4={card.cardLastFourDigits} name={card.cardholderName} />
              <div className="form form--grid pay-fields">
                <label className="span-2">Card brand<select name="cardBrand" value={card.cardBrand} onChange={changeCard}>{cardBrands.map((v) => <option key={v} value={v}>{label(v)}</option>)}</select></label>
                <label className="span-2">Cardholder name<input name="cardholderName" required value={card.cardholderName} onChange={changeCard} placeholder="Name on card" /></label>
                <label>Last 4 digits<input name="cardLastFourDigits" required inputMode="numeric" pattern="[0-9]{4}" maxLength="4" value={card.cardLastFourDigits} onChange={changeCard} placeholder="4242" /></label>
                <label>Payment token<input name="paymentToken" minLength="12" required value={card.paymentToken} onChange={changeCard} placeholder="tok_test_card_success_0001" /></label>
                <small className="span-2 form__hint">Test gateway — use any 12+ character token to succeed, or <code>TEST-PAYMENT-DECLINED</code> to simulate a decline.</small>
              </div>
            </div>
          : <div className="form form--grid pay-fields">
              <label>Wallet<select name="walletProvider" value={wallet.walletProvider} onChange={(e) => setWallet({ ...wallet, walletProvider: e.target.value })}>{walletProviders.map((v) => <option key={v} value={v}>{label(v)}</option>)}</select></label>
              <label>Wallet token<input name="walletToken" minLength="12" required value={wallet.walletToken} onChange={(e) => setWallet({ ...wallet, walletToken: e.target.value })} placeholder="tok_test_wallet_success_0001" /></label>
            </div>}

        <label className="pay-billing-toggle"><input type="checkbox" checked={sameAsDelivery} onChange={(e) => setSameAsDelivery(e.target.checked)} /><span>Billing address same as delivery{delivery ? ` (${delivery.streetAddress}, ${delivery.city})` : ''}</span></label>

        {!sameAsDelivery && <>
          <h2>Billing address</h2>
          <div className="form form--grid">{Object.keys(emptyBilling).map((key) => <label key={key} className={key === 'streetAddress' ? 'span-2' : ''}>{label(key)}<input name={key} required={key !== 'suburb'} value={billing[key]} onChange={changeBilling} /></label>)}</div>
        </>}

        <button className="button button--primary button--full" disabled={busy || total == null}>{busy ? 'Processing…' : total != null ? `Pay ${money(total)}` : 'Pay securely'}</button>
      </form>

      <aside className="summary payment-summary">
        <h2>Order summary</h2>
        {order?.orderItems?.map((item) => <div key={item.orderItemId} className="pay-line"><span>{item.quantity}× {item.productName}</span><span>{money(item.lineTotal)}</span></div>)}
        {breakdown && <>
          <div className="pay-line pay-line--muted"><span>Subtotal</span><span>{money(breakdown.basketSubtotal)}</span></div>
          {Number(breakdown.discountAmount) > 0 && <div className="pay-line pay-line--muted"><span>Discount</span><span>−{money(breakdown.discountAmount)}</span></div>}
          {Number(breakdown.vatAmount) > 0 && <div className="pay-line pay-line--muted"><span>VAT</span><span>{money(breakdown.vatAmount)}</span></div>}
          <div className="pay-line pay-line--muted"><span>Delivery</span><span>{Number(breakdown.deliveryFee) > 0 ? money(breakdown.deliveryFee) : 'Free'}</span></div>
          <div className="pay-line pay-line--total"><span>Total</span><strong>{money(breakdown.finalInvoiceTotal)}</strong></div>
        </>}
      </aside>
    </div>
  </main>
}
