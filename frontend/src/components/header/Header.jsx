import { useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth/useAuth.js'
import { useCart } from '../../hooks/cart/useCart.js'
import { storeAssets } from '../../constants/assets/storeAssets.js'
import HamburgerButton from '../hamburger-button/HamburgerButton.jsx'
import MobileNav from '../mobile-nav/MobileNav.jsx'

const MENU_ID = 'primary-navigation'

export default function Header() {
  const { session, profile, isAdmin, logout } = useAuth()
  const { count } = useCart()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const navigate = useNavigate()

  const active = ({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'
  const submit = (event) => {
    event.preventDefault()
    navigate(`/catalog?search=${encodeURIComponent(search)}`)
  }

  return <>
    <div className="header-shell">
      <header className="header">
        <span className="header__menu"><HamburgerButton buttonRef={menuButtonRef} open={menuOpen} controls={MENU_ID} onToggle={() => setMenuOpen((value) => !value)} /></span>
        <Link className="brand header__brand" to="/"><img src={storeAssets.logo} alt="Incredible Tech" /></Link>
        <nav className="nav" aria-label="Main navigation">{isAdmin ? <NavLink className={active} to="/admin">Admin Dashboard</NavLink> : <NavLink className={active} to="/catalog">Shop</NavLink>}</nav>
        {!isAdmin && <form className="header-search" role="search" onSubmit={submit}><input aria-label="Search store" placeholder="Search products, categories or brands..." value={search} onChange={(event) => setSearch(event.target.value)} /></form>}
        <div className="header__actions">{isAdmin ? (session && <div className="account-menu"><Link to="/admin"><span className="avatar">{profile?.firstName?.[0] || 'A'}</span><span>{profile?.firstName || 'Admin'}<small>Administrator</small></span></Link><button type="button" onClick={logout}>Sign out</button></div>) : <>{session && <NavLink className={active} to="/orders">Orders</NavLink>}{session && <NavLink className={`${'nav__link'} header__cart`} to="/cart">Cart{count > 0 && <span className="cart-badge" aria-label={`${count} items in cart`}>{count}</span>}</NavLink>}{session ? <div className="account-menu"><Link to="/profile"><span className="avatar">{profile?.firstName?.[0] || 'U'}</span><span>Hi, {profile?.firstName || 'there'}<small>My Account</small></span></Link><button type="button" onClick={logout}>Sign out</button></div> : <Link className="button button--primary" to="/login">Sign in</Link>}</>}</div>
      </header>
    </div>
    <MobileNav id={MENU_ID} open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={menuButtonRef} />
  </>
}
