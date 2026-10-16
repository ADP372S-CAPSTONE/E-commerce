import { Link } from 'react-router-dom'
import { money, label } from '../../utils/format/formatters.js'
import { useAuth } from '../../hooks/auth/useAuth.js'

export default function ProductCard({ product, onAdd }) {
  const { isAdmin } = useAuth()
  return <article className="product-card">
    <Link to={`/products/${product.productId}`} className="product-card__image-wrap">
      <img className="product-card__image" src={product.primaryImageUrl || '/placeholder.svg'} alt={product.productName} loading="lazy" decoding="async" />
      {product.featured && <span className="badge">Featured</span>}
    </Link>
    <div className="product-card__body">
      <span className="eyebrow">{label(product.brand)} · {label(product.category)}</span>
      <Link to={`/products/${product.productId}`}><h3>{product.productName}</h3></Link>
      <div className="product-card__price">
        <strong>{money(product.effectivePrice ?? product.price)}</strong>
        {product.discountPrice && <del>{money(product.price)}</del>}
      </div>
      {isAdmin
        ? <Link className="button button--ghost button--full" to={`/products/${product.productId}`}>View product</Link>
        : <button className="button button--primary button--full" disabled={!product.available} onClick={() => onAdd?.(product)}>
            {product.available ? 'Add to cart' : 'Out of stock'}
          </button>}
    </div>
  </article>
}