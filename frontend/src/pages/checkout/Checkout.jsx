import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notice from '../../components/notice/Notice.jsx'
import CheckoutSteps from '../../components/checkout-steps/CheckoutSteps.jsx'
import { orderService } from '../../services/orders/orderService.js'
import { useCart } from '../../hooks/cart/useCart.js'
import { provinces } from '../../constants/catalog/catalogOptions.js'

const initial = { recipientName: '', recipientPhone: '', streetAddress: '', suburb: '', city: '', province: '', postalCode: '', country: 'South Africa', deliveryInstructions: '' }

export default function Checkout() {
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  const { setCount } = useCart()
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('')
    try {
      const order = await orderService.checkout(form)
      setCount(0)
      navigate(`/payment/${order.orderId}`, { state: { order } })
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return <main className="page narrow">
    <header className="page-hero page-hero--small page-hero--flow"><span className="eyebrow">Secure checkout</span><h1>Delivery details</h1></header>
    <CheckoutSteps current={2} />
    <Notice message={error} />
    <form className="flow-card" onSubmit={submit}>
      <div className="flow-card__body">
        <div className="form form--grid">
          <label>Recipient name<input name="recipientName" required value={form.recipientName} onChange={change} /></label>
          <label>Mobile number<input name="recipientPhone" required value={form.recipientPhone} onChange={change} /></label>
          <label className="span-2">Street address<input name="streetAddress" required value={form.streetAddress} onChange={change} /></label>
          <label>Suburb<input name="suburb" value={form.suburb} onChange={change} /></label>
          <label>City<input name="city" required value={form.city} onChange={change} /></label>
          <label>Province
            <select name="province" required value={form.province} onChange={change}>
              <option value="" disabled>Select a province</option>
              {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Postal code<input name="postalCode" required pattern="[0-9]{4}" value={form.postalCode} onChange={change} /></label>
          <label className="span-2">Delivery instructions<textarea name="deliveryInstructions" maxLength="500" value={form.deliveryInstructions} onChange={change} /></label>
        </div>
      </div>
      <div className="flow-card__footer">
        <button className="button button--primary button--full" disabled={busy}>{busy ? 'Creating order…' : 'Continue to payment'}</button>
      </div>
    </form>
  </main>
}
