import { Link, Navigate, useNavigate } from 'react-router-dom'
import Reveal from '../../components/motion/reveal/Reveal.jsx'; import StaggerGroup from '../../components/motion/stagger-group/StaggerGroup.jsx'; import StaggerItem from '../../components/motion/stagger-item/StaggerItem.jsx'
import HomeBentoHero from '../../components/home-bento-hero/HomeBentoHero.jsx'
import HomeCategories from '../../components/home-categories/HomeCategories.jsx'
import FeaturedRail from '../../components/featured-rail/FeaturedRail.jsx'
import { productService } from '../../services/products/productService.js'; import { useAsync } from '../../hooks/async/useAsync.js'; import { useAuth } from '../../hooks/auth/useAuth.js'; import { useCart } from '../../hooks/cart/useCart.js'

const shortcuts = [['/orders', 'My Orders'], ['/tracking', 'Track Delivery'], ['/profile', 'My Account']]
export default function Home() {
  const { session, profile, isAdmin } = useAuth(); const navigate = useNavigate(); const { addItem } = useCart(); const { data: products = [], loading } = useAsync(productService.list, []); const list = products || []; const featuredList = list.filter((p) => p.featured); const featured = (featuredList.length ? featuredList : list).slice(0, 12)
  const add = async (product) => { if (!session) return navigate('/login'); await addItem(product) }
  if (isAdmin) return <Navigate to="/admin" replace />
  return <>
    <HomeBentoHero session={session} firstName={profile?.firstName} />
    <HomeCategories products={list} />
    <FeaturedRail products={featured} loading={loading} onAdd={add} />
    <section className="section quick-section"><Reveal as="h3">Quick Access</Reveal><StaggerGroup className="quick-grid">{shortcuts.map(([to, title]) => <StaggerItem key={title}><Link to={session ? to : '/login'} className="quick-card"><b>{title}</b></Link></StaggerItem>)}</StaggerGroup></section>
    <StaggerGroup as="section" className="trust-strip"><StaggerItem><b>Secure Payments</b></StaggerItem><StaggerItem><b>Fast Delivery</b></StaggerItem><StaggerItem><b>Local Support</b></StaggerItem><StaggerItem><b>Quality Products</b></StaggerItem></StaggerGroup>
  </>
}
