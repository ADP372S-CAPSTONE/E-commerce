import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Loader from '../../components/loader/Loader.jsx'
import Notice from '../../components/notice/Notice.jsx'
import CheckoutSteps from '../../components/checkout-steps/CheckoutSteps.jsx'
import { cartService } from '../../services/cart/cartService.js'
import { useAsync } from '../../hooks/async/useAsync.js'
import { useCart } from '../../hooks/cart/useCart.js'
import { money } from '../../utils/format/formatters.js'
import { duration, easeOut } from '../../constants/motion/motionTokens.js'

// Recompute the derived totals locally so optimistic updates stay accurate
// before the authoritative cart comes back from the server.
const recompute = (cart) => {
  const items = cart.items || []
  return {
    ...cart,
    items,
    subtotal: items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0),
    totalItemQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  }
}

export default function Cart() {
  const { data: cart, setData, loading, error } = useAsync(cartService.get, [])
  const { setCount } = useCart()
  const reduceMotion = useReducedMotion()

  // Keep the page state and the header badge in step on every change.
  const sync = useCallback((next) => {
    if (!next) return
    setData(next)
    setCount(next.totalItemQuantity ?? 0)
  }, [setData, setCount])

  const remove = async (id) => {
    if (!cart) return
    const previous = cart
    sync(recompute({ ...cart, items: cart.items.filter((item) => item.cartItemId !== id) }))
    try { sync(await cartService.remove(id)) } catch { sync(previous) }
  }

  const updateQty = async (item, quantity) => {
    const max = Math.min(99, item.availableStock || 99)
    if (quantity < 1 || quantity > max || quantity === item.quantity) return
    const previous = cart
    sync(recompute({ ...cart, items: cart.items.map((entry) => entry.cartItemId === item.cartItemId ? { ...entry, quantity, lineTotal: Number(entry.unitPrice) * quantity } : entry) }))
    try { sync(await cartService.update(item.cartItemId, quantity)) } catch { sync(previous) }
  }

  const clear = async () => {
    if (!cart) return
    const previous = cart
    sync(recompute({ ...cart, items: [] }))
    try { sync(await cartService.clear()) } catch { sync(previous) }
  }

  if (loading) return <main className="page"><Loader /></main>

  const itemMotion = reduceMotion ? {} : {
    layout: true,
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -24, transition: { duration: duration.fast, ease: easeOut } },
    transition: { duration: duration.base, ease: easeOut },
  }

  return <main className="page">
    <header className="page-hero page-hero--small page-hero--flow"><span className="eyebrow">Your selection</span><h1>Shopping cart</h1></header>
    <CheckoutSteps current={1} />
    <Notice message={error} />
    {!cart?.items?.length
      ? <section className="empty"><h2>Your cart is empty.</h2><p>Find something built to keep up with you.</p><Link className="button button--primary" to="/catalog">Start shopping</Link></section>
      : <div className="cart-layout">
          <section className="cart-list">
            <AnimatePresence initial={false}>
              {cart.items.map((item) => (
                <motion.article className="cart-item" key={item.cartItemId} {...itemMotion}>
                  <img src={item.imageUrl || '/placeholder.svg'} alt="" />
                  <div><small>{item.sku}</small><h3>{item.productName}</h3><p>{money(item.unitPrice)} each</p></div>
                  <div className="qty-stepper">
                    <button type="button" onClick={() => updateQty(item, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Decrease ${item.productName} quantity`}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQty(item, item.quantity + 1)} disabled={item.quantity >= Math.min(99, item.availableStock || 99)} aria-label={`Increase ${item.productName} quantity`}>+</button>
                  </div>
                  <strong>{money(item.lineTotal)}</strong>
                  <button className="link-button" onClick={() => remove(item.cartItemId)}>Remove</button>
                </motion.article>
              ))}
            </AnimatePresence>
          </section>
          <aside className="summary">
            <h2>Order summary</h2>
            <div><span>Items</span><span>{cart.totalItemQuantity}</span></div>
            <div className="summary__total"><span>Subtotal</span><strong>{money(cart.subtotal)}</strong></div>
            <Link className="button button--primary button--full" to="/checkout">Continue to checkout</Link>
            <button className="link-button" onClick={clear}>Clear cart</button>
          </aside>
        </div>}
  </main>
}
