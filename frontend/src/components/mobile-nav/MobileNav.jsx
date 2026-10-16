import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useAuth } from '../../hooks/auth/useAuth.js'

const linkClass = ({ isActive }) => (isActive ? 'drawer__link drawer__link--active' : 'drawer__link')

/**
 * Slide-in navigation for small screens.
 *
 * Behaviour: closes on route change, on Escape, and on backdrop press. Page scroll is
 * locked while open, and focus moves into the panel then back to the trigger on close.
 */
export default function MobileNav({ id, open, onClose, triggerRef }) {
  const { session, profile, isAdmin, logout } = useAuth()
  const { pathname } = useLocation()
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // Close whenever the route changes so the drawer never covers the new page.
  useEffect(() => { if (open) onClose() }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a, button')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      triggerRef?.current?.focus()
    }
  }, [open])

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.nav
            id={id}
            ref={panelRef}
            className="drawer"
            aria-label="Site navigation"
            {...slide}
            transition={{ type: 'tween', duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="drawer__header">
              <strong>Menu</strong>
              <button type="button" className="drawer__close" onClick={onClose}>Close</button>
            </div>

            {session && (
              <div className="drawer__user">
                <span className="avatar">{profile?.firstName?.[0] || 'U'}</span>
                <span>{profile?.firstName || 'Account'}<small>{profile?.email}</small></span>
              </div>
            )}

            <div className="drawer__section">
              <span className="drawer__label">Shop</span>
              <NavLink to="/catalog" className={linkClass} end>All Products</NavLink>
            </div>

            {session && (
              <div className="drawer__section">
                <span className="drawer__label">My account</span>
                <NavLink to="/cart" className={linkClass}>Cart</NavLink>
                <NavLink to="/orders" className={linkClass}>Orders</NavLink>
                <NavLink to="/tracking" className={linkClass}>Track Delivery</NavLink>
                <NavLink to="/profile" className={linkClass}>Profile</NavLink>
              </div>
            )}

            {isAdmin && (
              <div className="drawer__section">
                <span className="drawer__label">Administration</span>
                <NavLink to="/admin" className={linkClass} end>Dashboard</NavLink>
                <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
                <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
                <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
              </div>
            )}

            <div className="drawer__footer">
              {session
                ? <button className="button button--outline-light button--full" onClick={() => { onClose(); logout() }}>Sign out</button>
                : <>
                    <Link className="button button--primary button--full" to="/login" onClick={onClose}>Sign in</Link>
                    <Link className="drawer__link drawer__link--center" to="/register" onClick={onClose}>Create an account</Link>
                  </>}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
