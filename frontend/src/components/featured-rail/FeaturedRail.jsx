import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product-card/ProductCard.jsx'
import ProductSkeleton from '../product-skeleton/ProductSkeleton.jsx'
import Reveal from '../motion/reveal/Reveal.jsx'
import './featured-rail.css'

/**
 * Horizontal product rail. Arrows sit on top and scroll the track left/right
 * by roughly one viewport of cards. The track is also swipe/scrollable.
 */
export default function FeaturedRail({ products = [], loading, onAdd }) {
  const trackRef = useRef(null)

  const scrollBy = (direction) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * Math.round(track.clientWidth * 0.85), behavior: 'smooth' })
  }

  if (!loading && products.length === 0) return null

  return (
    <section className="section rail">
      <Reveal className="rail__head">
        <div><span className="eyebrow">Featured</span><h2>New in store</h2></div>
        <div className="rail__nav">
          <button type="button" className="rail__arrow" aria-label="Previous products" onClick={() => scrollBy(-1)}>
            <span aria-hidden="true" className="rail__chevron rail__chevron--left" />
          </button>
          <button type="button" className="rail__arrow" aria-label="Next products" onClick={() => scrollBy(1)}>
            <span aria-hidden="true" className="rail__chevron rail__chevron--right" />
          </button>
        </div>
      </Reveal>

      {loading ? (
        <div className="rail__track rail__track--static"><ProductSkeleton count={4} /></div>
      ) : (
        <ul className="rail__track" ref={trackRef}>
          {products.map((product) => (
            <li className="rail__item" key={product.productId}><ProductCard product={product} onAdd={onAdd} /></li>
          ))}
        </ul>
      )}

      <div className="rail__foot"><Link className="rail__all" to="/catalog">Shop all</Link></div>
    </section>
  )
}
